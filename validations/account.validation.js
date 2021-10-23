import Joi from "joi";
import { password, objectId } from "./custom.validation.js";
import { statuses } from "../models/account.model.js";
import AccountService from "../services/account.service.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";


const createAccount = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5).max(200),
        timeZone: Joi.string().required().min(5).max(20),
        remarks: Joi.string().max(200).allow('').optional()
    })

}
const linkedToken = {
    query: Joi.object().keys({
        linkedToken: Joi.string().required().min(19).max(21),
    }),

}
const deleteAccount = {
    query: Joi.object().keys({
        accountId: Joi.string().custom(objectId),
    }),
};
const updateAccount = {
    query: Joi.object().keys({
        accountId: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
        password: Joi.string().min(5).max(200),
        fullName: Joi.string().min(5).max(200),
        remarks: Joi.string(),
    })
};
const getAccount = {
    query: Joi.object().keys({
        accountId: Joi.string().custom(objectId),
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

async function checkAccount(req, res, next) {
    try {
        const user = res.locals.user;
        let account = await AccountService.find({ owners: user.id, "_id": req.query.accountId });
        res.locals.account = account;
        next();
    } catch (err) {
        next(err);
    }
}



const getContract = {
    params: Joi.object().keys({
        id: Joi.custom(objectId),
    }),

}
const loginContract = {
    body: Joi.object().keys({
        id: Joi.custom(objectId),
    }),

}

const checkVerification = {
    query: {
        linkedToken: Joi.string().min(5).max(50),
    }
};

const verification = {
    query: Joi.object().keys({
        accountId: Joi.custom(objectId),
    }),
    body: Joi.object().keys({
        code: Joi.string().required().min(2).max(10),
    }),
};
const getConnections = {
    params: Joi.object().keys({
        id: Joi.custom(objectId),
    }),
    query: Joi.object().keys({
        page: Joi.number().min(1).max(1000),
        sortType: Joi.string().valid(...['RECENTLY_ADDED', 'LASTNAME_FIRSTNAME', 'FIRSTNAME_LASTNAME']),
    }),
};
const accountValidation = {
    createAccount,
    searchAccount,
    checkVerification,
    getAccount,
    updateAccount,
    deleteAccount,
    linkedToken,
    getContract,
    loginContract,
    verification,
    checkAccount,
    getConnections

}
export default accountValidation;