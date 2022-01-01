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
        const { filterByStatus, sortBy = 'DateSubmitted', sortType = "asc", keyword, limit = 10, page } = req.query;
        let filter;
        let mSortyBy = {};
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


        const results = await bookingService.list(filter, { sortBy: mSortyBy, limit, page });
        res.status(httpStatus.CREATED).send(results);

    }
)

const updateBooking = catchAsync(
    async (req, res) => {
        const { user } = res.locals;
        const result = await bookingService.updateById(req.body);
        res.status(httpStatus.CREATED).send(result);

    }
)
const geoCodeAddress = catchAsync(
    async (req, res) => {
        const { address } = req.body;
        const results = await bookingService.geoCodeAddress(address);
        res.status(httpStatus.CREATED).send(results);

    }
)
const bookingController = {
    createBooking, getBookings, geoCodeAddress, updateBooking
}

export default bookingController;