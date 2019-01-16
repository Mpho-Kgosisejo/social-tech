import mongoose from "mongoose"
import pluginUniqueValidator from "mongoose-unique-validator"

const OrderSchema = new mongoose.Schema({
    customer : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User' , 
        required : true
    },
    delivery : {
        type : Object,
        required : false
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