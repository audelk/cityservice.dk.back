import { json } from "express";
import mongoose from "mongoose";
import validator from "validator";
const { Schema } = mongoose;
import { toJSON, paginate } from "./plugins/index.js";
export const statuses = [{
        id: '9a67dff7-3c38-4052-a335-0cef93438ff6',
        title: 'Active',
        slug: 'active'
    },
    {
        id: 'a89672f5-e00d-4be4-9194-cb9d29f82165',
        title: 'Paused',
        slug: 'paused'
    },
    {
        id: '02f42092-bb23-4552-9ddb-cfdcc235d48f',
        title: 'Deactivated',
        slug: 'deactivated'
    },
    {
        id: '5648a630-979f-4403-8c41-fc9790dea8cd',
        title: 'Processing',
        slug: 'processing'
    },
    {
        id: '5648a630-979f-4403-8c41-fc9790dea8c1',
        title: 'Error Synching',
        slug: 'synching_error'
    },
    {
        id: '5648a630-979f-4403-8c41-fc9790dea8c2',
        title: 'Boarding',
        slug: 'boarding'
    }
];
export const contractSchema = mongoose.Schema({
    contractId: {
        type: String,
        maxlength: 200
    },
    seatUrn: { type: String, maxlength: 200 },
    name: { type: String, maxlength: 200 },
    description: { type: String, maxlength: 200 },
    cookiesStr: { type: String },
});
export const accountSchema = mongoose.Schema({
        fullName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
            minlength: 5
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            private: true,
        },
        picture: {
            type: String,
            trim: true,
            maxlength: 200,

        },
        remarks: {
            type: String,
            trim: true,
            maxlength: 200,
        },
        status: {
            type: String,
            enum: statuses.map(item => item.slug),
            default: 'paused'
        },
        registrationProgress: {
            type: String,
            enum: ['registration', 'subscription', 'synching', 'completed'],
            default: 'registration'
        },
        loginStatus: {
            type: String
        },
        proxy: {
            type: Schema.Types.ObjectId,
            ref: "Proxy"
        },
        linkedAccess: {
            csrfToken: {
                type: String
            },
            cookiesStr: {
                type: String
            },
            loginStatus: {
                type: String
            },

            linkedToken: {
                type: String
            },
            browserId: {
                type: Number
            },
            verificationUrl: {
                type: String
            },
            verificationDate: {
                type: Date
            },
            cookies: {
                type: Schema.Types.Mixed
            }
        },
        contracts: {
            type: [contractSchema]
        },
        subscription: {
            type: Schema.Types.Mixed
        },
        invoices: {
            type: [Schema.Types.Mixed]
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        owners: {
            type: [Schema.Types.ObjectId],
            ref: 'User'
        },
        profile: {
            type: Schema.Types.Mixed
        }

    }, { timestamps: true })
    // add plugin that converts mongoose to json
accountSchema.plugin(toJSON);
accountSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
accountSchema.statics.isEmailTaken = async function(email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

export const Account = mongoose.model('LIAccount', accountSchema);