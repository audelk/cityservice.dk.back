import mongoose from "mongoose";
import { toJSON, paginate } from "./plugins/index.js";
const { Schema } = mongoose;

const calendarDateSchema = mongoose.Schema({
    available: {
        type: Boolean,
        required: true,

    },
    date: {
        type: String,
        required: true,
    },
    bookings: {
        type: [Schema.Types.ObjectId],
        ref: 'Booking'
    },
    ownerId: {
        type: Schema.Types.ObjectId
    },
    hours: {
        type: [new Schema({ from: Schema.Types.Mixed, to: Schema.Types.Mixed, available: Boolean })]
    }

});

calendarDateSchema.plugin(toJSON);

export const CalendarDate = mongoose.model('calendarDate', calendarDateSchema);