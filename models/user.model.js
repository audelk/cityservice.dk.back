import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { toJSON, paginate } from "./plugins/index.js";
import { roles } from "../config/roles.js";
const { Schema } = mongoose;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
        minlength: 5
    },
    status: {
        type: String,
        required: false,
        enum: ['online', 'offline'],
        default: 'offline'
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
        /*validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error('Password must contain at least one letter and one number');
            }
        },*/
        private: true, // used by the toJSON plugin
    },
    role: {
        type: String,
        enum: roles,
        default: 'client',
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    bookings: {
        type: [Schema.Types.ObjectId],
        ref: 'Booking'
    },
    bookingProfiles: {
        type: [Schema.Types.Mixed]
    }

}, {
    timestamps: true,
});

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.statics.getUserByApiKey = async function (apiKey) {
    const user = await this.findOne({ "apiKeys.apiKey": apiKey });
    return user;
};
/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

export default User;