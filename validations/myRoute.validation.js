import Joi from "joi";
import { objectId } from "./custom.validation.js";

const create = {
    body: Joi.object().keys({
        name: Joi.string().required().min(5).max(200),
        comments: Joi.string().optional().max(1000).allow(""),
    })
}
const addDestination = {
    body: Joi.object().keys({
        routeId: Joi.custom(objectId).required(),
        destinationId: Joi.custom(objectId).required()

    })
}
const listDestination = {
    param: Joi.object().keys({
        id: Joi.custom(objectId).required()

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
        filterByStatus: Joi.string().optional().valid(...["Completed", "Processing", "Ready"]).allow(""),

    })
}
const remove = {
    params: Joi.object().keys({
        id: Joi.custom(objectId).required()
    })
}
const removeDestination = {
    body: Joi.object().keys({
        routeId: Joi.custom(objectId).required(),
        destinationId: Joi.custom(objectId).required()
    })
}
const geoCode = {
    body: Joi.object().keys({
        address: Joi.string().required().min(5).max(200),
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
const updateMyLocation = {
    params: Joi.object().keys({
        id: Joi.custom(objectId).required()
    }),
    body: Joi.object().keys({
        address: Joi.string().required().min(5).max(200),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
    })
}
export const MyRouteValidation = {
    create, remove, update, list, addDestination, listDestination, removeDestination, geoCode, updateMyLocation
}

export default MyRouteValidation;

