import express from "express";
import validate from "../../middlewares/validate.js";
import userValidation from "../../validations/user.validation.js";
import bookingController from "../../controllers/booking.controller.js";
import auth from "../../middlewares/auth.js";

const bookingRoute = express.Router();


bookingRoute
    .route("/")
    .post(auth("createBooking"), bookingController.createBooking)
    .get(auth("getBookings"), bookingController.getBookings)
    .put(auth("updateBooking"), bookingController.updateBooking)
bookingRoute
    .route("/:bookingId")
    .get(auth("getBooking"), bookingController.getBooking)
    .put(auth("updateBooking"), bookingController.updateBooking)
    .delete(auth("deleteBooking"), bookingController.deleteBooking);

bookingRoute
    .route("/:bookingId/pickup")
    .put(auth("updateBooking"), bookingController.updateBookingPickup);
bookingRoute
    .route("/:bookingId/shipping")
    .put(auth("updateBooking"), bookingController.updateBookingShipping)
bookingRoute
    .route("/geoCodeAddress")
    .post(auth("createBooking"), bookingController.geoCodeAddress)

export default bookingRoute;