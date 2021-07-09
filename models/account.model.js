import { Mongoose } from "mongoose";
const statuses = [{
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
const accountSchema = Mongoose.Schema({
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
            type: string,
            enum: statuses.map(item => item.slug),
            default: 'paused'

        },

    })
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

const LIAccount = mongoose.model('LIAccount', accountSchema);

export { LIAccount };