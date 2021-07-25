import express from "express";
import PaddleController from "../../controllers/paddle.controller.js";
import validate from "../../middlewares/validate.js";
import paddleValidation from "../../validations/paddle.validation.js";
const paddleRoute = express.Router();
paddleRoute
    .route('/webhooks')
    .post(PaddleController.webhooks);
paddleRoute
    .route('/plans')
    .get(PaddleController.subscriptionPlans)

paddleRoute
    .route('/subscriptions/:id')
    .put(validate(paddleValidation.updateSubscription), paddleValidation.verifyAccount, PaddleController.updateSubscription)
    .delete(validate(paddleValidation.subcriptionPayments), paddleValidation.verifyAccount, PaddleController.cancelSubscription);
paddleRoute
    .route('/payments/:id')
    .get(validate(paddleValidation.subcriptionPayments), paddleValidation.verifyAccount, PaddleController.payments);
export default paddleRoute;