import express from 'express';
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import accountValidation from '../../validations/account.validation.js';
import { AccountController } from "../../controllers/account.controller.js";
import PaddleController from '../../controllers/paddle.controller.js';
const accountRoute = express.Router();

accountRoute
    .route('/')
    .post(validate(accountValidation.createAccount), AccountController.create)
    //  .get(validate(accountValidation.getAccounts), AccountController.create);

accountRoute
    .route('/search')
    .get(validate(accountValidation.searchAccount), AccountController.search);

/**
    @todo:only admin can delete
*/

accountRoute
    .route('/contracts')
    .get(validate(accountValidation.linkedToken), accountValidation.verifyLinkedToken, AccountController.getContracts);

accountRoute
    .route('/contracts/login')
    .post(validate(accountValidation.linkedToken), validate(accountValidation.loginContract), accountValidation.verifyLinkedToken, AccountController.loginContract);
accountRoute
    .route('/verify')
    .post(validate(accountValidation.verification), accountValidation.verifyLinkedToken, AccountController.submitVerification)
accountRoute
    .route('/resendCode')
    .get(validate(accountValidation.linkedToken), accountValidation.verifyLinkedToken, AccountController.checkVerification)
accountRoute
    .route('/:id')
    .delete(validate(accountValidation.deleteAccount), AccountController.delete)
    .get(validate(accountValidation.getAccount), AccountController.get)
    .put(validate(accountValidation.updateAccount), AccountController.update);


export default accountRoute;