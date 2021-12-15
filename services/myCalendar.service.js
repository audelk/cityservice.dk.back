import httpStatus from "http-status";

import ApiError from "../utils/ApiError.js";
import { MyCalendarBooking } from "../models/myCalendar.model.js";
import bookingService from "./booking.service.js";
const addBooking = async (body) => {

    const booking = await MyCalendarBooking.create(body);
    return await booking.populate("bookingId");
}

const list = async (filter, options) => {
    const bookings = await MyCalendarBooking.paginate(filter, options);
    for (let index = 0; index < bookings.results.length; index++) {
        await bookings.results[index].populate("bookingId");
    }
    return bookings;
}


const myCalendarService = {
    addBooking, list,
}


export default myCalendarService;