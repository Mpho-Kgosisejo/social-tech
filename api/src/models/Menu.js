import mongoose from "mongoose"
import pluginUniqueValidator from "mongoose-unique-validator"

const MenuSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref:'MenuCategory' },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref:'Products' }]
}, {timestamps: true})

MenuSchema.plugin(pluginUniqueValidator, {message: "value must be unique"})

export default mongoose.model("Menu", MenuSchema)