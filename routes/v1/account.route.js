import express from 'express';
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import { createAccount } from '../../validations/account.validation.js';
import { AccountController } from "../../controllers/account.controller.js";
const accountRoute = express.Router();

accountRoute
    .route('/')
    .post(validate(createAccount), AccountController.create);


export default accountRoute;