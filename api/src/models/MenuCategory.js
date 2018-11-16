import mongoose from "mongoose"
import pluginUniqueValidator from "mongoose-unique-validator"

const Categoryschema = new mongoose.Schema({
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
        lowercase: false,
        unique: true
    },
    show: {
        type: Boolean,
        required: true,
        lowercase: true,
    }
}, {timestamps: true})

Categoryschema.plugin(pluginUniqueValidator, {message: "value must be unique"})

export default mongoose.model("MenuCategory", Categoryschema)