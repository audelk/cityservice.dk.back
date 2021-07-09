import { HttpStatus } from "http-status";



export class AccountController {
    static async create(req, res) {
        res.status(HttpStatus.CREATED).send({ "a": 1 });
    }
};
