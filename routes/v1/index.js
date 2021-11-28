import express from "express";
import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import docsRoute from "./docs.route.js";
import config from "../../config/config.js";
import userService from "../../services/user.service.js";
import auth from "../../middlewares/auth.js";
import dbaRoute from "./dba.route.js";
const router = express.Router();


const defaultRoutes = [{
    path: '/auth',
    route: authRoute,
},
{
    path: '/users',
    route: userRoute,
},
{
    path: "/dba",
    route: dbaRoute
}
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



export default router;