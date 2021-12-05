import express from "express";
import validate from "../../middlewares/validate.js";
import userValidation from "../../validations/user.validation.js";
import calendarController from "../../controllers/calendar.controller.js";
import auth from "../../middlewares/auth.js";

const calendarRoute = express.Router();


calendarRoute
    .route("/")
    .post(auth("createCalendar"), calendarController.createDate)
    .get(auth("createCalendar"), calendarController.getDates);
calendarRoute
    .route("/hour")
    .post(auth("createCalendar"), calendarController.createHour)
calendarRoute
    .route("/hour/:id")
    .delete(auth("createCalendar"), calendarController.deleteHour)
export default calendarRoute;