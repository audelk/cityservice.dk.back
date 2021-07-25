import Joi from "joi";
import AccountService from "../services/account.service.js";
import { objectId } from "./custom.validation.js";
const updateSubscription = {

    body: Joi.object().keys({
        newPlanId: Joi.number().integer().required(),
    }),
    params: Joi.object().keys({
        id: Joi.string().custom(objectId)
    })
};
const subcriptionPayments = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required()
    })
};



async function verifyAccount(req, res, next) {

    try {
        let account = await AccountService.get(req.params.id);
        res.locals.account = account;
        next();
    } catch (err) {
        if (err.statusCode == 404) {
            next(new ApiError(httpStatus.BAD_REQUEST, "Invalid Account"));
        } else
            next(err);

    }
}
const paddleValidation = {
    updateSubscription,
    subcriptionPayments,
    verifyAccount
}

export default paddleValidation;