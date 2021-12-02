import mongoose from "mongoose";
import { toJSON, paginate } from "./plugins/index.js";
const { Schema } = mongoose;

const calendarDateSchema = mongoose.Schema({
    available: {
        type: String,
        required: true,

    },
    timeStamp: {
        type: Number,
        required: true,
    },
    bookings: {
        type: [Schema.Types.ObjectId],
        ref: 'Booking'
    },
    owner: {
        type: Schema.Types.ObjectId
    }

});

calendarSchema.plugin(toJSON);

export const CalendarDate = mongoose.model('calendarDate', calendarDateSchema);