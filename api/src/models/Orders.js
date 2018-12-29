import mongoose from "mongoose"
import pluginUniqueValidator from "mongoose-unique-validator"
import Product from "./Product"

const OrderSchema = new mongoose.Schema({
    customer: {
        name : {
            type : String,
            required : true
        },
        contact : {
            type : String,
            required : true
        },
        delivery_adress : {
            type : String,
            required : false
        },
        cutomer_id : {
            type : String,
            required : true
        }
    },
    details : {
        itemsCount : {
            type : Number
        },
        totalItemsCount : {
            type : Number
        },
        subTotal : {
            type : Number
        },
        total : {
            type : Number
        },
        tax: {
            type : Number
        }
    },
    items: [],
    stripe : {},
    status : {
        type : String,
    }
}, {timestamps: true})

export default mongoose.model("Orders", OrderSchema)