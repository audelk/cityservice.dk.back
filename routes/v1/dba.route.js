import express from "express";

import DBAController from "../../controllers/dba.controller.js";
import validate from "../../middlewares/validate.js";
import dbaValidator from "../../validations/dba.validation.js";
const dbaRoute = express.Router();

dbaRoute
    .route('/')
    .get(validate(dbaValidator.getListing), DBAController.getMainDetails)


export default dbaRoute;