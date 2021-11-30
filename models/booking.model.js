import mongoose from "mongoose";

import { toJSON, paginate } from "./plugins/index.js";
const { Schema } = mongoose;

const bookingSchema = mongoose.Schema({
    pickup: {
        type: Schema.Types.Mixed,
        required: true
    },
    shipping: {
        type: Schema.Types.Mixed,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    images: {
        type: [String]
    },
    userId: {
        type: Schema.Types.ObjectId
    }
});

bookingSchema.plugin(toJSON);
bookingSchema.plugin(paginate);
bookingSchema.statics.findAvailable = async function () {
    const proxy = this.findOne();
    return proxy;
}
export const Booking = mongoose.model('Booking', bookingSchema);