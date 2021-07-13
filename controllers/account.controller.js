import httpStatus from "http-status";
import AccountServicce from '../services/account.service.js';
import catchAsync from "../utils/catchAsync.js";


export class AccountController {
    static create = catchAsync(
        async(req, res) => {
            const account = await AccountServicce.create(req.body);
            res.status(httpStatus.CREATED).send(account);
        });

    static delete = catchAsync(
        async(req, res) => {
            const account = await AccountServicce.delete(req.params.id);
            res.status(httpStatus.OK).send(account);
        });
    static get = catchAsync(
        async(req, res) => {
            const account = await AccountServicce.get(req.params.id);
            res.status(httpStatus.OK).send(account);
        });
    static update = catchAsync(
        async(req, res) => {
            const account = await AccountServicce.update(req.params.id, req.body);
            res.status(httpStatus.OK).send(account);
        });

    static search = catchAsync(
        async(req, res) => {
            const results = await AccountServicce.search(req.query);
            res.status(httpStatus.OK).send(results);
        });
};