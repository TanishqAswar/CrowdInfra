import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            default: 0,
        },
        gender: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
            required: true,
        },
        profile_image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

export default mongoose.model('user', userSchema)
