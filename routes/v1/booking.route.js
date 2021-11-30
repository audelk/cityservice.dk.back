import express from "express";
import validate from "../../middlewares/validate.js";
import userValidation from "../../validations/user.validation.js";
import bookingController from "../../controllers/booking.controller.js";
import auth from "../../middlewares/auth.js";

const bookingRoute = express.Router();


bookingRoute
    .route("/")
    .post(auth("createBooking"), bookingController.createBooking);


export default bookingRoute;