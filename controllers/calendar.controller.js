import httpStatus from "http-status";
import pick from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import calendarService from "../services/calendar.service.js";

const createDate = catchAsync(
    async (req, res) => {
        const user = res.locals.user;
        req.body.ownerId = user.id;
        const date = await calendarService.createDate(req.body);
        user.calendarDates.addToSet(date.id);
        user.markModified("calendarDates");
        await user.save();

        res.status(httpStatus.CREATED).send(date);
    }
);
const createHour = catchAsync(
    async (req, res) => {
        const user = res.locals.user;
        const hour = await calendarService.createHour(req.body);
        res.status(httpStatus.CREATED).send(hour);
    }
);
const deleteHour = catchAsync(
    async (req, res) => {
        const user = res.locals.user;
        const hour = await calendarService.deleteHour({ id: req.params.id, dateId: req.body.dateId });
        res.status(httpStatus.CREATED).send(hour);
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
    createDate, getDates, createHour, deleteHour
}

export default calendarController;