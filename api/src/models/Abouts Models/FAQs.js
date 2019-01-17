import mongoose from "mongoose"
import pluginUniqueValidator from "mongoose-unique-validator"

const FAQSchema = new mongoose.Schema({
    index:  Number,
    question : String,
    answer : String
}, {timestamps: true})

FAQSchema.plugin(pluginUniqueValidator, {message: "value must be unique"})

export default mongoose.model("FAQs", FAQSchema)