import httpStatus from "http-status";
import AccountService from "../services/account.service.js";
import PaddleService from "../services/paddle.service.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
export default class PaddleController {
    constructor() {

    }

    /**
     * webhooks handler
     */
    static webhooks = catchAsync(
        async(req, res) => {
            switch (req.body.alert_name) {
                case "subscription_created":
                    {
                        await PaddleService.createSubscription(req.body);
                        break;
                    }
                case "subscription_updated":
                    {
                        break;
                    }
                case "subscription_cancelled":
                    {
                        break;
                    }
                case "subscription_payment_succeeded":
                    {
                        await PaddleService.paySubscription(req.body);
                        break;
                    }
                case "subscription_payment_failed":
                    {

                        console.log("failed")
                        break;
                    }
                case "subscription_payment_refunded":
                    {
                        break;
                    }
                default:
                    break;

            }
            res.status(httpStatus.OK).send({});
        })

    /**
     * Get plans
     */
    static subscriptionPlans = catchAsync(
        async(req, res) => {
            const reponse = await PaddleService.getPlans();
            res.status(httpStatus.OK).send(reponse);
        })

    /**
     * Update subscription
     */
    static updateSubscription = catchAsync(
        async(req, res) => {
            const { newPlanId } = req.body;
            let account = res.locals.account;
            if (account.subscription) {
                var response = await PaddleService.updateSubscription(account.subscription.subscription_id, newPlanId, account.id);
                let temp = {};
                temp.next_bill_date = response.next_payment.date;
                temp.unit_price = response.next_payment.amount;
                temp.subscription_id = response.subscription_id;
                temp.subscription_plan_id = response.plan_id;
                account.subscription.user_id = response.user_id;
                Object.assign(account.subscription, temp);
                account.markModified('subscription')
                await account.save();
            } else
                throw new ApiError(httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]);
            res.status(httpStatus.OK).send(response);
        })

    /**
     * Cancel subscription
     */
    static cancelSubscription = catchAsync(
        async(req, res) => {
            let account = res.locals.account;
            if (account.subscription) {
                var reponse = await PaddleService.cancelSubscription(account.subscription.subscription_id);
                //!we cannot use remove since subscription is a Schema.Types.Mixed which is just a plain object
                //!using delete alone wont remove subscription property
                //*account.subscription.remove();
                account.subscription = undefined;
                delete account.subscription;
                account.markModified('subscription');
                account.save();
            } else
                throw new ApiError(httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]);
            res.status(httpStatus.OK).send(reponse);
        })

    /**
     * Get list of payments
     */
    static payments = catchAsync(
        async(req, res) => {
            let account = res.locals.account;
            if (account.subscription) {
                var reponse = await PaddleService.getPayments(account.subscription.subscription_id);

            } else
                throw new ApiError(httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]);


            res.status(httpStatus.OK).send(reponse);
        })


}