import httpStatus from "http-status";
import AccountService from '../services/account.service.js';
import catchAsync from "../utils/catchAsync.js";
import LinkedApp from "../services/linked-app.service.js";
import ApiError from "../utils/ApiError.js";
import { log } from "console";
import { LinkedinMessages } from '../utils/linkedHelper.js';
import { Proxy } from '../models/proxy.model.js';
import LinkedService from "../services/linkedin.service.js";
import PublicAccountModel from "../models/linkedin/public.account.model.js";
export class AccountController {


    /**
     * Register linkedin account. Retrieve token and cookies as well as contracts/premium cookies.
     */
    static create = catchAsync(
        async(req, res) => {
            const user = res.locals.user;
            req.body.creator = user.id;
            if (await AccountService.isAccountExist(req.body.email)) {
                throw new ApiError(httpStatus.BAD_REQUEST, "ACCOUNT_ALREADY_EXIST");
            }
            const proxy = await Proxy.findAvailable();
            const account = await _createAccount(req.body, proxy);
            user.accounts.addToSet(account.id);
            user.markModified("accounts");
            await user.save();
            const { loginStatus } = account.linkedAccess;
            res.status(httpStatus.CREATED).send({ loginStatus, id: account.id });
        });

    /**
     * Get account premium accounts
     */
    static getContracts = catchAsync(
        async(req, res) => {
            let account = res.locals.account;
            let contracts = await _getContracts(account);
            res.status(httpStatus.OK).send(contracts);
        }
    );

    /**
     * Get contract cookies
     */
    static loginContract = catchAsync(
        async(req, res) => {
            let account = res.locals.account;
            let contract = await _loginContract(account, req.body.id);
            res.status(httpStatus.OK).send(contract);
        });

    /**
     * check if verification page is still valid
     * returns {verification:true} | {account object} if successful login | error 
     */
    static checkVerification = catchAsync(
        async(req, res) => {
            let account = res.locals.account;
            let pId = JSON.parse(JSON.stringify(account.proxy))
            const proxy = await Proxy.findById(pId);
            if (!proxy)
                throw new ApiError(httpStatus.BAD_REQUEST, "NO_PROXY_ASSIGNED");
            let result = await _checkVerification(account, proxy);
            if (result.cookies == undefined) {
                //lets login to generate verification url
                let reloginRes = await _reLogin(account, proxy);
                if (reloginRes.linkedAccess.loginStatus == LinkedinMessages.LOGGED_IN) {
                    res.status(httpStatus.OK).send(reloginRes);
                } else res.status(httpStatus.OK).send({ verification: true });

            } else {

                Object.assign(account.linkedAccess, { cookies: result.cookies });

                await account.save();
                res.status(httpStatus.OK).send({ verification: true });
            }

        }
    );

    /**
     * submit verification code 
     * if succesfull, continue process of registration e.g,getting premium accounts,etc.
     * returns {  loginStatus }
     */
    static submitVerification = catchAsync(
        async(req, res) => {
            let account = res.locals.account;
            let pId = JSON.parse(JSON.stringify(account.proxy))
            const proxy = await Proxy.findById(pId);
            if (!proxy)
                throw new ApiError(httpStatus.BAD_REQUEST, "NO_PROXY_ASSIGNED");
            let loginStatus = await _submitVerification(account, req.body.code, proxy);
            res.status(httpStatus.CREATED).send({ loginStatus });
        }
    );

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


    /**
     * Get basic profile data
     */
    static getBasicProfile = catchAsync(
        async(req, res) => {
            const { linkedAccess: { csrfToken }, linkedAccess: { cookiesStr } } = res.locals.account;
            const raw = await LinkedService.getBasicProfile(csrfToken, cookiesStr);
            const data = LinkedService.formatRawBasicProfile(raw);
            res.status(httpStatus.OK).send(data);
        }
    );

    /**
     * Get invitation summary
     */
    static getInvitationSummary = catchAsync(
        async(req, res) => {
            const { linkedAccess: { csrfToken }, linkedAccess: { cookiesStr } } = res.locals.account;
            const raw = await LinkedService.getInvitationSummary(csrfToken, cookiesStr);
            const data = LinkedService.formatRawInvitationSummary(raw);
            res.status(httpStatus.OK).send(data);
        }
    );

    /**
     * Get connection summary
     */
    static getConnectionSummary = catchAsync(
        async(req, res) => {
            const { linkedAccess: { csrfToken }, linkedAccess: { cookiesStr } } = res.locals.account;
            const response = await LinkedService.getConnectionSummary(csrfToken, cookiesStr);
            const { numConnections } = response.data;
            res.status(httpStatus.OK).send({ numConnections });
        }
    );

    /**
     * Get connection summary
     */
    static getConnections = catchAsync(
        async(req, res) => {
            const { linkedAccess: { csrfToken }, linkedAccess: { cookiesStr } } = res.locals.account;
            const { page = 1, sortType = "RECENTLY_ADDED" } = req.query;
            const { data: { numConnections } } = await LinkedService.getConnectionSummary(csrfToken, cookiesStr);
            let perPage = 40;
            let totalCount = numConnections;
            let start = 0;
            let items = [];
            let pages = Math.ceil(totalCount / perPage);
            start = (start + perPage) * (page - 1);
            if (page <= pages) {
                var raw = await LinkedService.getConnections(csrfToken, cookiesStr, start, perPage, sortType);
                items = LinkedService.formatRawGetConnections(raw);
            } else {
                throw new ApiError(httpStatus.BAD_REQUEST, LinkedinMessages.INVALID_PAGE);
            }
            res.status(httpStatus.OK).send({ items, perPage, totalCount });
        }
    );
};



/**
 * This are just subfunctions (prefix with _ ) for the methods above , 
 * to catch specific errors and handle it here,instead of going directly to catchAsync.
 * For example, if we have error when retrieving contracts, we dont want to throw it to catchAsync
 * cause we still want to continue the process of registering the account.
 */

async function _getContracts(account) {

    const contracts = await LinkedApp.contracts(account.linkedAccess);
    contracts.forEach(item => {
        let contract = account.contracts.find(contract => contract.contractId == item.contractId)
        if (!contract)
            account.contracts.addToSet(item);
    });
    await account.save();
    return account.contracts;
}

async function _loginContract(account, id) {
    let contract = account.contracts.find(item => item.id == id);
    if (!contract) {
        throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND]);
    }
    const { cookiesStr } = await LinkedApp.loginContract(account.linkedAccess, contract);
    contract.cookiesStr = cookiesStr;
    account.save();
    return contract;
}

async function _checkVerification(account, proxy) {
    const result = await LinkedApp.checkVerification(account.linkedAccess, proxy.toObject()).catch(err => {
        return err;
    });
    return result;
}

async function _createAccount({ email, password, remarks, fullName, timeZone, creator }, proxy) {
    const linkedAccess = await LinkedApp.login({ email, password, proxy });
    const account = await AccountService.createAndSave({ remarks, fullName, timeZone, email, password, linkedAccess, creator, proxy: proxy.id });
    account.owners.addToSet(creator);
    account.markModified("owners");
    await account.save();
    if (linkedAccess.loginStatus == LinkedinMessages.LOGGED_IN)
        await _processContracts(account);
    return account;
}

async function _reLogin(account, proxy) {
    const linkedAccess = await LinkedApp.login({ email: account.email, password: account.password, proxy: proxy.toObject() })
    delete linkedAccess.linkedToken;
    Object.assign(account.linkedAccess, {...linkedAccess });
    await account.save();
    if (linkedAccess.loginStatus == LinkedinMessages.LOGGED_IN) {
        // process account contracts if any            
        await _processContracts(account);
    }
    return account;
}

async function _submitVerification(account, code, proxy) {

    const { linkedAccess } = await LinkedApp.submitVerification(account.linkedAccess, code, proxy)
        .catch((err) => {
            if (err.message == "PAGE_EXPIRED") {
                throw new ApiError(httpStatus.BAD_REQUEST, LinkedinMessages.LOGGED_IN_VERIFICATION_EXPIRED_CODE);
            } else
                throw err;
        });
    delete linkedAccess.linkedToken;
    Object.assign(account.linkedAccess, {...linkedAccess });
    await account.save();
    if (linkedAccess.loginStatus == LinkedinMessages.LOGGED_IN) {
        delete linkedAccess.cookies;
        // process account contracts if any            
        await _processContracts(account);
    } else if (linkedAccess.loginStatus == LinkedinMessages.LOGGED_IN_VERIFICATION_WRONG_CODE) {
        throw new ApiError(httpStatus.BAD_REQUEST, LinkedinMessages.LOGGED_IN_VERIFICATION_WRONG_CODE);
    }
    return linkedAccess.loginStatus;
}

async function _processContracts(account) {
    // process account contracts if any            
    await _getContracts(account).catch(err => {
        //dont throw, let creation continue
        log(err);
    });
    for (var i = 0; i < account.contracts.length; i++) {
        await _loginContract(account, account.contracts[i].id).catch(err => {
            //dont throw, let creation continue
            log(err);
        });
    }

}