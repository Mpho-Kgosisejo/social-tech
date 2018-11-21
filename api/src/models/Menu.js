import mongoose from "mongoose"

const MenuSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref:'MenuCategory' },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref:'Products' }]
}, {timestamps: true})

export default mongoose.model("Menu", MenuSchema)