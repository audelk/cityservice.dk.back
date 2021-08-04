import Joi from "joi";
import { statuses } from "../models/account.model.js";
import AccountService from "../services/account.service.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import LinkedService from "../services/linkedin.service.js";
import { LinkedinMessages } from "../utils/linkedHelper.js";
import { password, objectId } from "./custom.validation.js";

const get = {
    params: Joi.object().keys({
        profileId: Joi.string().required().min(10).max(50),
    }),
    query: Joi.object().keys({
        accountId: Joi.custom(objectId),
    }),
};

const val = {
    get
}
export default val;