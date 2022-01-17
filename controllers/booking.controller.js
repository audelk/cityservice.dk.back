import httpStatus from "http-status";
import pick from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import bookingService from "../services/booking.service.js";

const createBooking = catchAsync(
    async (req, res) => {
        const user = res.locals.user;
        req.body.userId = user.id;
        const booking = await bookingService.create(req.body);
        user.bookings.addToSet(booking.id);
        user.markModified("bookings");
        await user.save();

        res.status(httpStatus.CREATED).send(booking);
    }
);


const getBookings = catchAsync(
    async (req, res) => {
        const { user } = res.locals;
        const { filterByStatus, filterByRoute, filterByUser, sortBy = 'DateSubmitted', sortType = "asc", keyword, limit = 10, page } = req.query;
        let filterByUserId = filterByUser;
        let filter;
        let mSortyBy = {};
        if (user.role == 'client')
            filterByUserId = user.id;
        if (filterByStatus) {
            let filters = filterByStatus.split(',').map(item => { return { status: item } });
            filter = { $or: filters };
        }

        if (sortBy == "PickupDate") {
            mSortyBy = `pickup.pickupDate:${sortType}`;
        }
        else if (sortBy == "ZipCode") {
            mSortyBy = `pickup.zip:${sortType}`;
        }
        else
            mSortyBy = `createdAt:${sortType}`;

        if (keyword) {
            if (filter)
                filter['$and'] = [{ "pickup.zip": keyword.trim() }];
            else
                filter = { "pickup.zip": keyword.trim() }
        };
        if (filterByUserId) {
            if (filter && filter['$and']) {
                filter['$and'].push({ "userId": filterByUserId })
            }
            else if (filter && !filter['$and']) {
                filter['$and'] = [{ "userId": filterByUserId }];
            }
            else if (!filter)
                filter = { "userId": filterByUserId };
        }
        if (filterByRoute) {
            if (filter && filter['$and']) {
                filter['$and'].push({ "routes": { "$ne": filterByRoute } })
            }
            else if (filter && !filter['$and']) {
                filter['$and'] = [{ "routes": { "$ne": filterByRoute } }];
            }
        }
        const results = await bookingService.list(filter, { sortBy: mSortyBy, limit, page });
        res.status(httpStatus.CREATED).send(results);

    }
)

const updateBookingPickup = catchAsync(
    async (req, res) => {
        const { user } = res.locals;
        const result = await bookingService.updatePickup(req.params.bookingId, req.body);
        res.status(httpStatus.OK).send(result);

    }
)
const updateBookingShipping = catchAsync(
    async (req, res) => {
        const { user } = res.locals;
        const result = await bookingService.updateShipping(req.params.bookingId, req.body);
        res.status(httpStatus.OK).send(result);

    }
)
const updateBooking = catchAsync(
    async (req, res) => {
        const { user } = res.locals;
        const result = await bookingService.updateById(req.body);
        res.status(httpStatus.CREATED).send(result);

    }
)
const deleteBooking = catchAsync(
    async (req, res) => {
        const { user } = res.locals;
        const result = await bookingService.deleteBooking(req.params.bookingId, user.role);
        res.status(httpStatus.OK).send({});

    }
)
const geoCodeAddress = catchAsync(
    async (req, res) => {
        const { address } = req.body;
        const results = await bookingService.geoCodeAddress(address);
        res.status(httpStatus.CREATED).send(results);

    }
)
const getBooking = catchAsync(
    async (req, res) => {
        const { user } = res.locals;
        const booking = await bookingService.getById(req.params.bookingId);
        if (!booking) {
            throw new ApiError(httpStatus.NOT_FOUND, 'INVALID_BOOKING');
        }
        res.send(booking);

    }
)
const bookingController = {
    createBooking, getBookings, geoCodeAddress, updateBooking, deleteBooking, getBooking, updateBookingPickup, updateBookingShipping
}

export default bookingController;