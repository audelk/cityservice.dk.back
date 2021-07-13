import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import { Account, statuses, accountSchema } from '../models/account.model.js';
export default class AccountServicce {

    static async create(fields) {
        if (await Account.isEmailTaken(fields.email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
        } else {
            return Account.create(fields);
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

    static async update(id, fields) {
        let model = await Account.findById(id);
        if (!model) {
            throw new ApiError(httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]);
        }
        Object.assign(model, fields);
        await model.save();
        return model;
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
        } else {
            models = await Account.find({ $or: [{ fullName: { $regex: `.*${keyword}.*` } }, { email: { $regex: `.*${keyword}.*` } }, { remarks: { $regex: `.*${keyword}.*` } }] });
        }
        if (!models)
            throw new ApiError(httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]);
        return models;
    }
}