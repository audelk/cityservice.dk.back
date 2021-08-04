import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import httpStatus from 'http-status';
import config from './config/config.js';
import morganConfig from './config/morgan.js';
import jwtStrategy from './config/passport.js';
import authLimiter from './middlewares/rateLimiter.js';
import routes from './routes/v1/index.js';
import { errorConverter, errorHandler } from './middlewares/error.js';
import ApiError from './utils/ApiError.js';
import expressJSDocSwagger from 'express-jsdoc-swagger';
var app = express();

if (config.env !== 'test') {
    app.use(morganConfig.successHandler);
    app.use(morganConfig.errorHandler);
}

const options = {
    info: {
        version: '1.0.0',
        title: 'Albums store',
        license: {
            name: 'MIT',
        },
    },
    security: {
        BasicAuth: {
            type: 'http',
            scheme: 'basic',
        },
    },
    baseDir: './',
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: './routes/v1/*.js',
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/api-docs',
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Expose Open API JSON Docs documentation in `apiDocsPath` path.
    exposeApiDocs: false,
    // Open API JSON Docs endpoint.
    apiDocsPath: '/v1/api-docs',
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false,
    // You can customize your UI options.
    // you can extend swagger-ui-express config. You can checkout an example of this
    // in the `example/configuration/swaggerOptions.js`
    swaggerUiOptions: {},
    // multiple option in case you want more that one instance
    multiple: true,
};
expressJSDocSwagger(app)(options);
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// public
app.use('/web', express.static('public'));

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
    app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;