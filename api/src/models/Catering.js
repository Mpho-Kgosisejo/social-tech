import mongoose from "mongoose"
import pluginUniqueValidator from 'mongoose-unique-validator'

const CateringSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
        required: true,
        trim: true
    },
    phone: {
        type: String,
        default: "",
        required: true,
        trim: true
    },
    email: {
        type: String,
        default: "",
        required: true,
        trim: true
    },
    event: {
        type: String,
        default: "",
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: "",
        unique: true,
        required: true
    },
    numberOfPeople: {
        type: Number,
        default: "",
        required: true
    },
    location: {
        type: String,
        default: "",
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: "",
        trim: true
    }
}, {timestamps: true})

CateringSchema.plugin(pluginUniqueValidator, {message: "date must be unique"})

export default mongoose.model("Catering", CateringSchema)