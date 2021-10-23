import httpStatus from "http-status";
import AccountService from '../services/account.service.js';
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import { log } from "console";
import { LinkedinMessages } from '../utils/linkedHelper.js';
import { Proxy } from '../models/proxy.model.js';
import PublicAccountModel from "../models/linkedin/public.account.model.js";
import LinkedinAPI from "../services/linkedin.api.service.js";
export class AccountController {

    static create = catchAsync(
        async(req, res) => {
            const user = res.locals.user;
            req.body.creator = user.id;
            if (await AccountService.isAccountExist(req.body.email)) {
                throw new ApiError(httpStatus.BAD_REQUEST, "ACCOUNT_ALREADY_EXIST");
            }

            const account = await _createAccount(req.body);
            user.accounts.addToSet(account.id);
            user.markModified("accounts");
            await user.save();
            const { loginStatus } = account.linkedAccess;
            res.status(httpStatus.CREATED).send({ loginStatus, id: account.id });
        });



    /**
     * Delete account  by id
     */
    static delete = catchAsync(
        async(req, res) => {
            const user = res.locals.user;
            const account = await AccountService.delete(req.query.accountId, user.id);
            res.status(httpStatus.OK).send(account);
        });

    /**
     * get account by id
     */
    static get = catchAsync(

        async(req, res) => {
            const user = res.locals.user;
            let account = await AccountService.get(req.query.accountId, user.id);
            account = new PublicAccountModel(account);
            res.status(httpStatus.OK).send(account);
        });

    /**
     * update account by id
     */
    static update = catchAsync(
        async(req, res) => {
            const user = res.locals.user;
            const account = await AccountService.update(req.query.accountId, req.body, user.id);
            res.status(httpStatus.OK).send(account);
        });

    /**
     * Search functionality, accepts validated query
     */
    static search = catchAsync(
        async(req, res) => {
            let results = await AccountService.search(res.locals.user.id, req.query);
            //let temp = await res.locals.user.populate("accounts").execPopulate();
            results = results.map(item => { return new PublicAccountModel(item) });
            res.status(httpStatus.OK).send(results);
        });



};

async function _createAccount({ email, password, remarks, timeZone, creator }) {
    const res = await LinkedinAPI.add(email, password, remarks);
    const account = await AccountService.createAndSave({ remarks, fullName: "s", timeZone, email, password, creator });
    account.owners.addToSet(creator);
    account.markModified("owners");
    await account.save();
    return res;
}