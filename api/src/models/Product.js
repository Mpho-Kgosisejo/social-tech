import mongoose from "mongoose"
import pluginUniqueValidator from "mongoose-unique-validator"
import random from "mongoose-simple-random"

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
        required : true,
        default : 0
    }
}, {timestamps: true})

ProductSchema.plugin(pluginUniqueValidator, {message: "value must be unique"})
ProductSchema.plugin(random)

export default mongoose.model("Products", ProductSchema)