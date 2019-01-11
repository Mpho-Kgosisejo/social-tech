import mongoose from "mongoose"
import pluginUniqueValidator from "mongoose-unique-validator"

const ProductSchema = new mongoose.Schema({
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
    ingredients : [{
        type : String,
        required : false,
    }],
    menuCategoryId : {
        type: String,
        required : true
    },
    numberOfOrders : {
        type : Number,
        required : false
    }
}, {timestamps: true})

ProductSchema.plugin(pluginUniqueValidator, {message: "value must be unique"})

export default mongoose.model("Products", ProductSchema)