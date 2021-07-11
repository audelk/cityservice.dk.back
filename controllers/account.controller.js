import httpStatus from "http-status";
import AccountServicce from '../services/account.service.js';
import catchAsync from "../utils/catchAsync.js";


export class AccountController {

    static async create(req, res, next) {
        try {
            const account = await AccountServicce.create(req.body);
            res.status(httpStatus.CREATED).send(account);
        } catch (err) {
            next(err);
        }
    }

    static create1 = catchAsync(
        async(req, res) => {
            const account = await AccountServicce.create(req.body);
            res.status(httpStatus.CREATED).send(account);
        }

    );
};

/***
{
    "compilerOptions": {
        "experimentalDecorators": true,
        "allowJs": true
    }
} */