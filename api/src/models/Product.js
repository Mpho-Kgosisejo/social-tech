import mongoose from "mongoose"
import pluginUniqueValidator from "mongoose-unique-validator"

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        default : "",
        required : [true, 'A menu product must have a name'],
        unique : true
    },
    price : {
        type : Number,
        default : 0,
        required : true,
    },
    available : {
        type : Boolean,
        default : false,
        required : true,
    },
    image : {
        type : String,
        default : "http://picsum.photos/400/400/?random",
        required : true,
    },
    description : {
        type : String,
        default : "no description",
        required : true,
    },
    ingredients : {
        type : String,
        default : "no ingredients",
        required : true,
    },
    menuCategoryId : {
        type : String,
        required : true
    }
}, {timestamps: true})

productSchema.plugin(pluginUniqueValidator, {message: "value must be unique"})

export default mongoose.model("Products", productSchema)