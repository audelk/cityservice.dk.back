import Joi from "joi";
import { validUrl } from "./custom.validation.js";
const getListing = {
    query: Joi.object().keys({
        url: Joi.string().required().custom(validUrl),
    }),
};

const dbaValidator = {
    getListing
}


export default dbaValidator;