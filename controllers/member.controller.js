import httpStatus from "http-status";
import AccountService from '../services/account.service.js';
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import { log } from "console";
import { LinkedinMessages } from '../utils/linkedHelper.js';
import LinkedMemberService from "../services/linkedin.member.service.js";
export default class MemberController {
    constructor() {

    }


    static getContactInfo = catchAsync(
        async(req, res) => {
            const { linkedAccess: { csrfToken }, linkedAccess: { cookiesStr } } = res.locals.account;
            const raw = await LinkedMemberService.getContactInfo(csrfToken, cookiesStr, req.params.profileId);
            const response = LinkedMemberService.formatRawGetContactInfo(raw);
            res.status(httpStatus.OK).send(response);
        })

    static getMainProfile = catchAsync(
        async(req, res) => {
            const { linkedAccess: { csrfToken }, linkedAccess: { cookiesStr } } = res.locals.account;
            const raw = await LinkedMemberService.getMainProfile(csrfToken, cookiesStr, req.params.profileId);
            const result = LinkedMemberService.formatRawGetMainProfile(raw);
            res.status(httpStatus.OK).send(result);
        })
}