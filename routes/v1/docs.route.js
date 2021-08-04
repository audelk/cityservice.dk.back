import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDefinition from "../../docs/swaggerDef.js";

const docsRoute = express.Router();

const specs = swaggerJsdoc({
    swaggerDefinition,
    apis: ['../../docsa/*.yml', '../../routes/v1/user.route.js'],
});

docsRoute.use('/', swaggerUi.serve);
docsRoute.get(
    '/',
    swaggerUi.setup(specs, {
        explorer: true,
    })
);

export default docsRoute;