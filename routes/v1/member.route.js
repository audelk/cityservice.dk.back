import express from 'express';
import MemberController from '../../controllers/member.controller.js';
import validate from "../../middlewares/validate.js";
import acVdn from '../../validations/account.validation.js';
import memVdn from '../../validations/member.validation.js';
const memberRoute = express.Router();

memberRoute
    .route('/:profileId/contactInfo')
    .get(validate(memVdn.get), acVdn.checkAccount, acVdn.checkCookies, MemberController.getContactInfo);

memberRoute
    .route('/:profileId/mainProfile')
    .get(validate(memVdn.get), acVdn.checkAccount, acVdn.checkCookies, MemberController.getMainProfile);
export default memberRoute;