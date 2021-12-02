import httpStatus from "http-status";
import pick from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import calendarService from "../services/calendar.service.js";

const createDate = catchAsync(
    async (req, res) => {
        const user = res.locals.user;
        req.body.ownerId = user.id;
        const booking = await calendarService.createDate(req.body);
        user.bookings.addToSet(booking.id);
        user.markModified("bookings");
        await user.save();

        res.status(httpStatus.CREATED).send(booking);
    }
);
const getDates = catchAsync(
    async (req, res) => {
        const { user } = res.locals;
        const { filter, sortBy, populate, limit, page } = req.query;
        const results = await calendarService.listDate(filter, {
            sortBy, page, populate, limit
        });
        res.status(httpStatus.CREATED).send(results);

    }
)

const calendarController = {
    createDate, getDates
}

export default calendarController;