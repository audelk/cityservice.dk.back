import express from "express";
import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import docsRoute from "./docs.route.js";
import config from "../../config/config.js";
import userService from "../../services/user.service.js";
import auth from "../../middlewares/auth.js";
import dbaRoute from "./dba.route.js";
import bookingRoute from "./booking.route.js";
import calendarRoute from "./calendar.route.js";
import myCalendarRoute from "./myCalendar.route.js";
import myRouteRoute from "./myRoute.route.js";
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
},
{
    path: "/booking",
    route: bookingRoute
},
{
    path: "/calendar",
    route: calendarRoute
},
{
    path: "/myCalendar",
    route: myCalendarRoute
},
{
    path: "/myRoute",
    route: myRouteRoute
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

async function checkUser(req, res, next) {
    try {
        let user = await userService.checkApiKey(req.query.apiKey);
        delete req.query.apiKey;
        res.locals.user = user;
        next();
    } catch (err) {
        next(err);
    }
}

export default router;