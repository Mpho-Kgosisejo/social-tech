import mongoose from "mongoose"
import pluginUniqueValidator from "mongoose-unique-validator"

const OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
        required: true,
        lowercase: true,
        unique: true
    },
    title: {
        type: String,
        default: "",
        required: true,
        unique: true
    },
    show: {
        type: Boolean,
        required: true
    },
    items : []
}, {timestamps: true})

export default mongoose.model("Orders", OrderSchema)