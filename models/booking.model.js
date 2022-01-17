import mongoose from "mongoose";

import { toJSON, paginate } from "./plugins/index.js";
const { Schema } = mongoose;

const bookingSchema = mongoose.Schema(
    {
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
        },
        status: {
            type: String,
            required: false,
            enum: ["Submitted", 'Booked', 'PickedUp', 'Cancelled', "Paused", 'Delivered', 'Rejected'],
            default: "Submitted"
        },
        pickupTime: {
            type: [new Schema({ from: Schema.Types.Mixed, to: Schema.Types.Mixed, available: Boolean })]
        },
        routes: {
            type: [Schema.Types.ObjectId]
        }
    },
    {
        timestamps: true,
    });

bookingSchema.plugin(toJSON);
bookingSchema.plugin(paginate);
bookingSchema.statics.findAvailable = async function () {
    const proxy = this.findOne();
    return proxy;
}
export const Booking = mongoose.model('Booking', bookingSchema);