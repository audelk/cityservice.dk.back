import express from "express";
import validate from "../../middlewares/validate.js";
import userValidation from "../../validations/user.validation.js";
import bookingController from "../../controllers/booking.controller.js";
import auth from "../../middlewares/auth.js";
import myCalendarController from "../../controllers/myCalendar.controller.js";
const myCalendarRoute = express.Router();


myCalendarRoute
    .route("/")
    .post(auth("createBooking"), myCalendarController.addBooking)
    .get(auth("createBooking"), myCalendarController.getBookings)

export default myCalendarRoute;