import express from 'express';
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import { createAccount, deleteAccount, searchAccount, updateAccount, getAccount } from '../../validations/account.validation.js';
import { AccountController } from "../../controllers/account.controller.js";
const accountRoute = express.Router();

accountRoute
    .route('/')
    .post(validate(createAccount), AccountController.create);

accountRoute
    .route('/search')
    .get(validate(searchAccount), AccountController.search);

/**
    @todo:only admin can delete
*/
accountRoute
    .route('/:id')
    .delete(validate(deleteAccount), AccountController.delete)
    .get(validate(getAccount), AccountController.get)
    .put(validate(updateAccount), AccountController.update);



export default accountRoute;