import httpStatus from "http-status";
import { Booking } from "../models/booking.model.js";
import { User } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

const create = async (body) => {

    return Booking.create(body)
}

const list = async (filter, options) => {
    const bookings = await Booking.paginate(filter, options);
    return bookings;
}
const getById = async (id) => {
    return Booking.findById(id);
}
const bookingService = {
    create, list
}

export default bookingService;