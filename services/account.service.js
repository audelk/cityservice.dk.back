import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import { Account, statuses, accountSchema } from '../models/account.model.js';
import { Proxy } from "../models/proxy.model.js";
export default class AccountService {

    static async createAndSave(fields) {
        if (await Account.isEmailTaken(fields.email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
        } else {
            const account = await Account.create(fields);
            account.save();
            return account;
        }
    }

    static async delete(id) {
        let model = await Account.findByIdAndDelete(id);
        if (!model)
            throw new ApiError(httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]);
        return model;
    }

    static async get(id) {
        let model = await Account.findById(id);
        if (!model)
            throw new ApiError(httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]);
        return model;
    }
    static async find(field) {
        let model = await Account.findOne(field);
        if (!model)
            throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND]);
        return model;
    }

    static async update(id, fields) {
        let model = await Account.findById(id);
        if (!model) {
            throw new ApiError(httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]);
        }
        Object.assign(model, fields);
        await model.save();
        return model;
    }

    static async isAccountExist(email) {
        return await Account.isEmailTaken(email);
    }

    static async search(query) {
        let models;
        let { type, keyword, status, registrationProgress } = query;
        if (type == 'status') {
            models = await Account.find({
                [type]: status
            });
        } else if (type == 'registrationProgress') {
            models = await Account.find({
                [type]: registrationProgress
            });
        } else if (keyword) {
            models = await Account.find({ $or: [{ fullName: { $regex: `.*${keyword}.*` } }, { email: { $regex: `.*${keyword}.*` } }, { remarks: { $regex: `.*${keyword}.*` } }] });
        } else {
            models = await Account.find();
        }
        if (!models)
            throw new ApiError(httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]);
        return models;
    }
}