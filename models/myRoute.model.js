import mongoose from "mongoose";

import { toJSON, paginate } from "./plugins/index.js";
const { Schema } = mongoose;

const myRouteSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 200,
            minLenth: 5
        },
        comments: {
            type: String,
            required: false,
            maxlength: 1000,

        },
        status: {
            type: String,
            required: true,
            enum: ["Ready", "Completed", "Processing"],
            default: "Ready"
        },
        destination: {
            type: [Schema.Types.ObjectId],
            ref: 'Booking'
        },
        myLocation: {
            type: new Schema({ address: Schema.Types.String, latitude: Schema.Types.Number, longitude: Schema.Types.Number })
        }

    },
    {
        timestamps: true,
    });

myRouteSchema.plugin(toJSON);
myRouteSchema.plugin(paginate);

export const MyRoute = mongoose.model('MyRoute', myRouteSchema);
export default MyRoute;