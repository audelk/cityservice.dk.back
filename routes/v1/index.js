import express from "express";
import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import docsRoute from "./docs.route.js";
import accountRoute from "./account.route.js";
import config from "../../config/config.js";
import paddleRoute from "./paddle.route.js";
import userService from "../../services/user.service.js";
import memberRoute from "./member.route.js";
const router = express.Router();


const defaultRoutes = [{
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/users',
        route: userRoute,
    },
];

const devRoutes = [
    // routes available only in development mode
    // {
    //   path: '/docs',
    //  route: docsRoute,
    // },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}
router.use('/accounts', checkApiKey, accountRoute);
router.use('/paddle', paddleRoute);
router.use('/members', checkApiKey, memberRoute);


export default router;


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