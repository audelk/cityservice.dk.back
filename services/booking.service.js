import httpStatus from "http-status";
import { Booking } from "../models/booking.model.js";
import { User } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

const create = async (body) => {

    return Booking.create(body)
}

const bookingService = {
    create
}

export default bookingService;