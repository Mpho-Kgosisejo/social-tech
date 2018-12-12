import mongoose from "mongoose"
import pluginUniqueValidator from "mongoose-unique-validator"

const StorySchema = new mongoose.Schema({
    description : String,
    tags : [{
        tag_name : String,
        icon_tag : String,
        tag_descritption : String
    }]
}, {timestamps: true},)

StorySchema.plugin(pluginUniqueValidator, {message: "value must be unique"})

export default mongoose.model("ourstory", StorySchema)