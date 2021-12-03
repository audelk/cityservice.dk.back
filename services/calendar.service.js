
import httpStatus from "http-status";
import { User } from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import { CalendarDate } from "../models/calendarDate.model.js";
const createDate = async (body) => {
    const date = await CalendarDate.findOneAndUpdate({ date: body.date }, body, { new: true });
    if (date)
        return date;
    else
        return CalendarDate.create(body)
}

const listDate = async (userId) => {
    const bookings = await CalendarDate.find({ ownderId: userId });
    return bookings;
}
const getDate = async (id) => {
    return CalendarDate.findById(id);
}
const calendarService = {
    createDate, getDate, listDate
}

export default calendarService;