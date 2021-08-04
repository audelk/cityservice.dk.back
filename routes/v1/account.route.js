import express from 'express';
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import acVdn from '../../validations/account.validation.js';
import { AccountController } from "../../controllers/account.controller.js";
import PaddleController from '../../controllers/paddle.controller.js';
const accountRoute = express.Router();
/**
 * A song
 * @typedef {object} Song
 * @property {string} title.required - The title
 * @property {string} artist - The artist
 * @property {integer} year - The year
 */

/**
 * GET /v1/accounts
 * @summary This is the summary of the endpoint
 * @tags album
 * @return {array<Song>} 200 - success response - application/json
 */
accountRoute
    .route('/')
    .post(validate(acVdn.createAccount), AccountController.create)
    //  .get(validate(accountValidation.getAccounts), AccountController.create);

/**
 * GET /v1/accounts/search
 * @summary This is the summary of the endpoint
 * @tags album
 * @return {array<Song>} 200 - success response - application/json
 */

/**
 * PUT /v1/accounts/search
 * @summary This is the summary of the endpoint
 * @tags album
 * @return {array<Song>} 200 - success response - application/json
 */
accountRoute
    .route('/search')
    .get(validate(acVdn.searchAccount), AccountController.search);

accountRoute
    .route('/')
    .delete(validate(acVdn.deleteAccount), AccountController.delete)
    .get(validate(acVdn.getAccount), AccountController.get)
    .put(validate(acVdn.updateAccount), AccountController.update);
accountRoute
    .route('/invitationSummary')
    .get(validate(acVdn.getAccount), acVdn.checkAccount, acVdn.checkCookies, AccountController.getInvitationSummary);
accountRoute
    .route('/basicProfile')
    .get(validate(acVdn.getAccount), acVdn.checkAccount, acVdn.checkCookies, AccountController.getBasicProfile);
accountRoute
    .route('/contracts')
    .get(validate(acVdn.getAccount), acVdn.checkAccount, acVdn.checkCookies, AccountController.getContracts);

accountRoute
    .route('/contracts/login')
    .post(validate(acVdn.getAccount), validate(acVdn.loginContract), acVdn.checkAccount, acVdn.checkCookies, AccountController.loginContract);
accountRoute
    .route('/verify')
    .post(validate(acVdn.verification), acVdn.checkAccount, AccountController.submitVerification)
accountRoute
    .route('/resendCode')
    .get(validate(acVdn.getAccount), acVdn.checkAccount, AccountController.checkVerification)

accountRoute
    .route('/connectionSummary')
    .get(validate(acVdn.getAccount), acVdn.checkAccount, acVdn.checkCookies, AccountController.getConnectionSummary);
accountRoute
    .route('/connectionSummary')
    .get(validate(acVdn.getAccount), acVdn.checkAccount, acVdn.checkCookies, AccountController.getConnectionSummary);
export default accountRoute;