import httpStatus from "http-status";
import AccountService from "./account.service.js";
import fetch from 'node-fetch';
import config from '../config/config.js';
import FormData from 'form-data';
import ApiError from '../utils/ApiError.js';
var request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
};
export default class PaddleService {
    constructor() {

    }

    static async createSubscription(body) {
        const {
            user_id,
            subscription_id,
            status,
            email,
            cancel_url,
            update_url,
            subscription_plan_id,
            next_bill_date,
            unit_price,
            passthrough,

        } = body;
        await AccountService.update(passthrough, {
            status: "active",
            subscription: {
                user_id,
                subscription_id,
                status,
                email,
                cancel_url,
                update_url,
                subscription_plan_id,
                next_bill_date,
                unit_price,
                date: new Date().toJSON().slice(0, 10)
            }
        });

    }
    static async paySubscription(body) {
        const {
            checkout_id,
            email,
            user_id,
            subscription_plan_id,
            next_bill_date,
            subscription_id,
            plan_name,
            payment_method,
            status,
            receipt_url,
            unit_price,
            sale_gross,
            currency,
            subscription_payment_id,
            next_payment_amount,
            passthrough,

        } = body;

        let account = await AccountService.get(passthrough);
        account.invoices.addToSet({
            checkout_id,
            email,
            user_id,
            subscription_plan_id,
            next_bill_date,
            plan_name,
            payment_method,
            status,
            receipt_url,
            sale_gross,
            currency,
            unit_price,
            subscription_id,
            subscription_payment_id,
            next_payment_amount,
            date: new Date().toJSON().slice(0, 10)
        });
        await account.save();
    }


    /**
     * Update subscription
     * @param {number} subscriptionId 
     * @param {number} newPlanId 
     * @param {string} accountId 
     * @returns Object paddle response json. see paddle doc
     */
    static async updateSubscription(subscriptionId, newPlanId, accountId) {
        var formdata = new FormData();
        formdata.append("vendor_id", config.paddleVendorId);
        formdata.append("vendor_auth_code", config.paddleAuthCode);
        formdata.append("plan_id", newPlanId);
        formdata.append("subscription_id", subscriptionId);
        formdata.append("quantity", 1);
        formdata.append("bill_immediately", "true");
        formdata.append("prorate", "true");
        formdata.append("passthrough", accountId);
        var requestOptions = {
            method: 'POST',
            body: formdata,
        };

        const res = await fetch(`${config.paddleAPIUrl}subscription/users/update`, requestOptions)
            .then(res =>
                res.json()
            )
        if (res.success == false)
            throw new ApiError(httpStatus.BAD_REQUEST, res.error.message);

        return res.response;
    }

    /**
     * Get Plans
     * @returns Object paddle response json. see paddle doc
     */
    static async getPlans() {
        let body = { "vendor_id": config.paddleVendorId, "vendor_auth_code": config.paddleAuthCode };
        let temp = {...request, ... { body: JSON.stringify(body) } };
        const res = await fetch(`${config.paddleAPIUrl}subscription/plans`, temp)
            .then(res => res.json());
        if (res.success == false)
            throw new ApiError(httpStatus.BAD_REQUEST, res.error.message);
        return res.response;
    }

    /**
     * Get payments with filter
     * @param {number} subscription_id filter by
     * @param {number} plan_id filter by
     * @returns 
     */
    static async getPayments(subscription_id, plan_id) {
        let body = {
            "vendor_id": config.paddleVendorId,
            "vendor_auth_code": config.paddleAuthCode,
            subscription_id,
            plan_id
        };
        let temp = {...request, ... { body: JSON.stringify(body) } };
        const res = await fetch(`${config.paddleAPIUrl}subscription/payments`, temp)
            .then(res => res.json());
        if (res.success == false)
            throw new ApiError(httpStatus.BAD_REQUEST, res.error.message);
        return res.response;
    }

    static async cancelSubscription(subscription_id) {
        let body = {
            "vendor_id": config.paddleVendorId,
            "vendor_auth_code": config.paddleAuthCode,
            subscription_id
        };
        let temp = {...request, ... { body: JSON.stringify(body) } };
        const res = await fetch(`${config.paddleAPIUrl}subscription/users_cancel`, temp)
            .then(res => res.json());
        if (res.success == false)
            throw new ApiError(httpStatus.BAD_REQUEST, res.error.message);
        return res;
    }
}