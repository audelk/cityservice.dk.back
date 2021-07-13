import Joi from "joi";
import { password, objectId } from "./custom.validation.js";
import { statuses } from "../models/account.model.js";

const createAccount = {
    body: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(5).max(200),
            fullName: Joi.string().required().min(5).max(200),
            remarks: Joi.string(),
        }

    )

}
const deleteAccount = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
};
const updateAccount = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
        password: Joi.string().required().min(5).max(200),
        fullName: Joi.string().required().min(5).max(200),
        remarks: Joi.string(),
    })
};
const getAccount = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
};
const searchAccount = {
    query: Joi.object().keys({
        keyword: Joi.string().min(5).max(50),
        type: Joi.string().valid(...['status', 'registrationProgress']),
        status: Joi.when("type", {
            is: Joi.string().valid('status').required(),
            then: Joi.string().valid(...statuses.map(item => item.slug)).required(),
            otherwise: Joi.valid(null)
        }),
        registrationProgress: Joi.when("type", {
            is: Joi.string().valid('registrationProgress').required(),
            then: Joi.string().valid(...['registration', 'subscription', 'synching', 'completed']).required(),
            otherwise: Joi.valid(null)
        })
    }),
};
export {
    createAccount,
    searchAccount,
    getAccount,
    updateAccount,
    deleteAccount
}