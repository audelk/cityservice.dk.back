
import httpStatus from "http-status";
import { User } from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import { AdminCalendarDate } from "../models/adminCalendarDate.js";
const createDate = async (body) => {
    return AdminCalendarDate.create(body)
}

const listDate = async (filter, options) => {
    const bookings = await Booking.paginate(filter, options);
    return bookings;
}
const getDate = async (id) => {
    return Booking.findById(id);
}
const calendarService = {
    createDate, getDate, listDate
}

export default calendarService;