import Joi from "joi";
import { password, objectId } from "./custom.validation.js";


const createAccount = {
    body: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(5).max(200),
            fullName: Joi.string().required().min(5).max(200),
            remarks: Joi.string(),
        }

    )

}

export {
    createAccount
}