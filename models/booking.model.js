import mongoose from "mongoose";

import { toJSON, paginate } from "./plugins/index.js";

const bookingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
        minlength: 5
    },

});

bookingSchema.plugin(toJSON);
bookingSchema.plugin(paginate);
bookingSchema.statics.findAvailable = async function () {
    const proxy = this.findOne();
    return proxy;
}
export const Booking = mongoose.model('Booking', bookingSchema);