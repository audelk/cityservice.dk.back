import express from "express";
import PaddleController from "../../controllers/paddle.controller.js";
import validate from "../../middlewares/validate.js";
import paddleVdn from "../../validations/paddle.validation.js";
import userService from "../../services/user.service.js";
const paddleRoute = express.Router();
paddleRoute
    .route('/webhooks')
    .post(PaddleController.webhooks);
paddleRoute
    .route('/plans')
    .get(checkApiKey, PaddleController.subscriptionPlans)

paddleRoute
    .route('/subscriptions')
    .put(checkApiKey, validate(paddleVdn.updateSubscription), paddleVdn.verifyAccount, PaddleController.updateSubscription)
    .delete(checkApiKey, validate(paddleVdn.subcriptionPayments), paddleVdn.verifyAccount, PaddleController.cancelSubscription);
paddleRoute
    .route('/payments')
    .get(checkApiKey, validate(paddleVdn.subcriptionPayments), paddleVdn.verifyAccount, PaddleController.payments);
export default paddleRoute;

/**
 * Api key validator middleware
 */
async function checkApiKey(req, res, next) {
    try {
        let user = await userService.checkApiKey(req.query.apiKey);
        delete req.query.apiKey;
        res.locals.user = user;
        next();
    } catch (err) {
        next(err);
    }
}