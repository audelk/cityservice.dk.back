import mongoose from "mongoose";
import { toJSON, paginate } from "./plugins/index.js";
const { Schema } = mongoose;

const myCalendarBookingSchema = mongoose.Schema({

    start: {
        type: String,
        maxlength: 200,
        maxlength: 200,
        minlength: 5
    },
    end: {
        type: String,
        required: true,
        maxlength: 200,
        minlength: 5
    },
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },


});

myCalendarBookingSchema.plugin(toJSON);
myCalendarBookingSchema.plugin(paginate);

export const MyCalendarBooking = mongoose.model('myCalendarBookings', myCalendarBookingSchema);