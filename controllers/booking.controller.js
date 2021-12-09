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
        const { filter, sortBy, populate, limit, page } = req.query;
        const results = await bookingService.list(filter, {
            sortBy, page, populate, limit
        });
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