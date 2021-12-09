import express from "express";
import validate from "../../middlewares/validate.js";
import userValidation from "../../validations/user.validation.js";
import bookingController from "../../controllers/booking.controller.js";
import auth from "../../middlewares/auth.js";

const bookingRoute = express.Router();


bookingRoute
    .route("/")
    .post(auth("createBooking"), bookingController.createBooking)
    .get(auth("createBooking"), bookingController.getBookings)
    .put(auth("updateBooking"), bookingController.updateBooking);
bookingRoute
    .route("/geoCodeAddress")
    .post(auth("createBooking"), bookingController.geoCodeAddress)

export default bookingRoute;