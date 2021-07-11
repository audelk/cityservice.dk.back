import httpStatus from "http-status";
import { Account } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

export default class AccountServicce {
    static async create(fields) {
        if (await Account.isEmailTaken(fields.email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');

        } else
            return Account.create(fields);
    }
}