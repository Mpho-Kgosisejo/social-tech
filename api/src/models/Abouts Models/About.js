import mongoose from "mongoose"
import pluginUniqueValidator from "mongoose-unique-validator"
import Chefs from "./Chefs"
import Story from "./Story"
import FAQs from "./FAQs";
import ContactUs from "./ContactUs";

const AboutSchema = new mongoose.Schema({
    our_story : Story,
    faqs : [FAQs],
    chefs : [Chefs],
    contact_us : ContactUs
}, {timestamps: true})

AboutSchema.plugin(pluginUniqueValidator, {message: "value must be unique"})

export default mongoose.model("Abouts", AboutSchema)