import mongoose from "mongoose"
import pluginUniqueValidator from "mongoose-unique-validator"


const ContactUsSchema = new mongoose.Schema({
    email : String,
    address_1: String,
    address_2: String,
    address_3: String,
    city: String,
    tel: String,
    fax: String,
    chefs_phone: String,
    business_hours: String,
}, {timestamps: true})

ContactUsSchema.plugin(pluginUniqueValidator, {message: "value must be unique"})

export default mongoose.model("ContactUS", ContactUsSchema)