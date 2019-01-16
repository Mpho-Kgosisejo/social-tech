import mongoose from "mongoose"
import pluginUniqueValidator from "mongoose-unique-validator"

const netSchema = new mongoose.Schema({
    totalNet : {
        type : Number,
        default : 0,
        required : true
    }
}, {timestamps: true})

export default mongoose.model("NetEarning", netSchema)