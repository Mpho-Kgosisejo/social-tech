import mongoose from "mongoose"
import pluginUniqueValidator from "mongoose-unique-validator"

const ChefSchema = new mongoose.Schema({
    name : String,  
    speciality : String,
    background : String,
    image_url :  String,
    rating : Number
}, {timestamps: true})

ChefSchema.plugin(pluginUniqueValidator, {message: "value must be unique"})

export default mongoose.model("Chefs", ChefSchema)