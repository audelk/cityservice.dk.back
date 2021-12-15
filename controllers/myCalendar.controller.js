import httpStatus from "http-status";
import pick from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import bookingService from "../services/booking.service.js";
import myCalendarService from "../services/myCalendar.service.js";
const addBooking = catchAsync(
    async (req, res) => {
        const user = res.locals.user;
        req.body.userId = user.id;
        const booking = await bookingService.getById(req.body.bookingId);
        const myCbooking = await myCalendarService.addBooking(req.body);
        booking.status = "Booked";
        await booking.save();
        res.status(httpStatus.CREATED).send(myCbooking);
    }
);
const getBookings = catchAsync(
    async (req, res) => {
        const { user } = res.locals;
        const { sortBy, keyword, limit = 1000, page } = req.query;
        let filter;
        const results = await myCalendarService.list(filter, { sortBy, limit, page });
        res.status(httpStatus.CREATED).send(results);

    }
)


const myCalendarController = {
    addBooking, getBookings,
}

export default myCalendarController;