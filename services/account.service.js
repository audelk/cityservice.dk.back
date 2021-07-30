import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import { Account, statuses, accountSchema } from '../models/account.model.js';
import { Proxy } from "../models/proxy.model.js";
export default class AccountService {

    /**
     * 
     * @param {object} fields 
     * @returns object account
     */
    static async createAndSave(fields) {
        if (await Account.isEmailTaken(fields.email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
        } else {
            const account = await Account.create(fields);
            await account.save();
            return account;
        }
    }

    /**
     * 
     * @param {ObjectId} id 
     * @param {ObjectId} userId 
     * @returns object account
     */
    static async delete(id, userId) {
        let model = await Account.findOneAndDelete({ "_id": id, owners: userId });
        if (!model)
            throw new ApiError(httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]);
        return model;
    }

    /**
     * 
     * @param {ObjectId} id 
     * @param {ObjectId} userId 
     * @returns  object account
     */
    static async get(id, userId) {
        let model = await Account.findOne({ "_id": id, owners: userId });
        if (!model)
            throw new ApiError(httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]);
        return model;
    }

    /**
     * 
     * @param {object} field 
     * @returns object account
     */
    static async find(field) {
        let model = await Account.findOne(field);
        if (!model)
            throw new ApiError(httpStatus.NOT_FOUND, "ACCOUNT_NOT_FOUND");
        return model;
    }

    /**
     * 
     * @param {ObjectId} id 
     * @param {object} fields 
     * @param {ObjectId} userId 
     * @returns object account
     */
    static async update(id, fields, userId) {
        let model = await Account.findOne({ "_id": id, owners: userId });
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

    static async search(userId, query) {
        let models;
        let { type, keyword, status, registrationProgress } = query;
        if (type == 'status') {
            models = await Account.find({
                [type]: status,
                "owners": userId
            });
        } else if (type == 'registrationProgress') {
            models = await Account.find({
                [type]: registrationProgress,
                "owners": userId
            });
        } else if (keyword) {
            models = await Account.find({ "owners": userId, $or: [{ fullName: { $regex: `.*${keyword}.*` } }, { email: { $regex: `.*${keyword}.*` } }, { remarks: { $regex: `.*${keyword}.*` } }] });
        } else {
            models = await Account.find({ "owners": userId });
        }
        if (!models)
            throw new ApiError(httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]);
        return models;
    }
}