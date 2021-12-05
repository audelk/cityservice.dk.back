
import httpStatus from "http-status";
import { User } from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import { CalendarDate } from "../models/calendarDate.model.js";
const createDate = async (body) => {
    const date = await CalendarDate.findOneAndUpdate({ date: body.date }, body, { new: true });
    if (date)
        return date;
    else {
        body.hours = []
        return CalendarDate.create(body)
    }

}
const createHourV1 = async (body) => {
    const { dateId, available, hour } = body;
    const date = await CalendarDate.findById(dateId);
    if (date) {
        let found = false;
        date.hours = date.hours.map(item => {
            if (item && item.hour == hour) {
                found = item;
                item.available = available;

            }
            return item ? item : undefined;
        });
        if (found === false)
            var [r] = date.hours.addToSet({
                available, hour
            });
        else
            var r = found;
        await date.save();
        return r;
    }
    throw new ApiError(httpStatus.NOT_FOUND, 'INVALID_DATE');
}

const createHour = async (body) => {
    const { dateId, available, from, to } = body;
    const date = await CalendarDate.findById(dateId);
    if (date) {
        var [r] = date.hours.addToSet({
            available, from, to
        });
        await date.save();
        return r;
    }
    throw new ApiError(httpStatus.NOT_FOUND, 'INVALID_DATE');
}
const deleteHour = async (body) => {
    const { dateId, id } = body;
    const hour = await CalendarDate.findByIdAndUpdate(dateId, {
        '$pull': {
            'hours': { '_id': id }
        }
    });
    if (hour)
        return { dateId, id };
    throw new ApiError(httpStatus.NOT_FOUND, 'INVALID_DATE');
}
const listDate = async (userId) => {
    const bookings = await CalendarDate.find({ ownderId: userId });
    return bookings;
}
const getDate = async (id) => {
    return CalendarDate.findById(id);
}
const calendarService = {
    createDate, getDate, listDate, createHour, deleteHour
}

export default calendarService;