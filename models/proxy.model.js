import mongoose from "mongoose";
import validator from "validator";

import { toJSON, paginate } from "./plugins/index.js";

const proxySchema = mongoose.Schema({
    proxyIp: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
        minlength: 5
    },
    proxyUsername: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
        minlength: 5
    },
    proxyPassword: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
        minlength: 5
    },
});

proxySchema.plugin(toJSON);
proxySchema.plugin(paginate);
proxySchema.statics.findAvailable = async function () {
    const proxy = this.findOne();
    return proxy;
}
export const Proxy = mongoose.model('Proxy', proxySchema);