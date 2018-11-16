import express from "express"
import MenuModel from "../models/MenuCategory"

const router = express.Router()

router.post("/", (req, res) => {
    res.send("Hello Express, This is fresh eats! :)")
})

export default router