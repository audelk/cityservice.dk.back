import Joi from "joi";
import { objectId } from "./custom.validation.js";

const create = {
    body: Joi.object().keys({
        name: Joi.string().required().min(5).max(200),
        comments: Joi.string().optional().max(1000).allow(""),
    })
}
const list = {
    query: Joi.object().keys({
        sortBy: Joi.string().optional().valid(...["name", "createdAt"]),
        sortType: Joi.string().optional().valid(...["desc", "asc"]),
        status: Joi.string().optional().max(200),
        keyword: Joi.string().optional().max(50).allow(""),
        limit: Joi.number().integer().max(100),
        page: Joi.number().integer(),

    })
}
const remove = {
    params: Joi.object().keys({
        id: Joi.custom(objectId).required()
    })
}
const update = {
    params: Joi.object().keys({
        id: Joi.custom(objectId).required()
    }),
    body: Joi.object().keys({
        name: Joi.string().required().min(5).max(200),
        comments: Joi.string().optional().max(1000),
    })
}
export const MyRouteValidation = {
    create, remove, update, list
}

export default MyRouteValidation;

