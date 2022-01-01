import Joi from "joi";
import { password, objectId } from "./custom.validation.js";

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5).max(20),
        //  password: Joi.string().required().custom(password),
        name: Joi.string().required().min(5).max(100),
        role: Joi.string().required().valid('user', 'admin'),
    }),
};

const getUsers = {
    query: Joi.object().keys({
        name: Joi.string(),
        role: Joi.string(),
        sortBy: Joi.string().valid('name', 'email', 'role', 'status', 'lastLogin').optional(),
        sortType: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
        keyword: Joi.string().max(100),
        filterByStatus: Joi.string().valid('Active', 'Blocked', 'Active,Blocked', 'Blocked,Active', '')
    }),
};

const getUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
};

const updateUser = {
    params: Joi.object().keys({
        userId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            email: Joi.string().email().optional(),
            password: Joi.string().min(5).max(20),
            name: Joi.string().min(5).max(100).optional(),
            role: Joi.string().valid('client', 'admin').optional(),
            status: Joi.string().valid('Active', 'Blocked').optional(),
            isEmailVerified: Joi.boolean().optional(),
        })
        .min(1),
};

const deleteUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
};

const userValidation = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};
export default userValidation;