import mongoose from "mongoose"
import pluginUniqueValidator from "mongoose-unique-validator"

const CategorySchema = new mongoose.Schema({
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
    }//,
    // items: [{ type: mongoose.Schema.Types.ObjectId, ref:'Products' }]
}, {timestamps: true})

CategorySchema.plugin(pluginUniqueValidator, {message: "value must be unique"})

export default mongoose.model("MenuCategory", CategorySchema)