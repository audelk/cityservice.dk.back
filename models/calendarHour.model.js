import mongoose from "mongoose";
import { toJSON } from "./plugins/index.js";
const calendarHourSchema = mongoose.Schema({
    available: {
        type: Boolean,
        required: true,

    },
    hour: {
        type: Number,
        required: true,
    },


});

calendarHourSchema.plugin(toJSON);

export const CalendarDate = mongoose.model('calendarHours', calendarHourSchema);