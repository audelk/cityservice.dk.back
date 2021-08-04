import Joi from "joi";
import AccountService from "../services/account.service.js";
import { objectId } from "./custom.validation.js";
const updateSubscription = {

    body: Joi.object().keys({
        newPlanId: Joi.number().integer().required(),
    }),
    query: Joi.object().keys({
        accountId: Joi.string().custom(objectId)
    })
};
const subcriptionPayments = {
    query: Joi.object().keys({
        accountId: Joi.string().custom(objectId).required()
    })
};



async function verifyAccount(req, res, next) {
    try {
        const user = res.locals.user;
        let account = await AccountService.find({ owners: user.id, "_id": req.query.accountId });
        res.locals.account = account;
        next();
    } catch (err) {
        next(err);
    }
}
const paddleValidation = {
    updateSubscription,
    subcriptionPayments,
    verifyAccount
}

export default paddleValidation;