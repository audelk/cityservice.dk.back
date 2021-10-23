import express from 'express';
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
    .post(validate(acVdn.createAccount), AccountController.create);


accountRoute
    .route('/search')
    .get(validate(acVdn.searchAccount), AccountController.search);

accountRoute
    .route('/')
    .delete(validate(acVdn.deleteAccount), AccountController.delete)
    .get(validate(acVdn.getAccount), AccountController.get)
    .put(validate(acVdn.updateAccount), AccountController.update);

export default accountRoute;