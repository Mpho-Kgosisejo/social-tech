import express from "express"
import CategoryModel from "../models/MenuCategory"
import ProductModel from "../models/Product"
import MenuModel from "../models/Menu"

const router  = express.Router()

// this will return all the menus
router.get("/", (req, res) => {
    MenuModel.find()
    .populate("category", "name title show")
    .populate("items", "menuCategoryId ingredients description image available price")
    .exec()
    .then(categories => {
        res.status(200).json({
            categories
        })
    })
    .catch(err => {
        res.status(404).json({
            error: err
        })
    })
})


// this will return all menu-categories
router.get("/menu-categories", (req, res) => {
    CategoryModel.find()
    .then(data => {
        res.json({
            data,
            message: "OK"
        })
    })
    .catch(err => {
        res.status(404).json({
            error: {
                message: "error..."
            }
        })
    })
})

// this will create a new menu
router.post("/", (req, res) => {
    const {name, title, show} = req.body

    const newMenu = CategoryModel({
        name,
        title,
        show
    })
    newMenu.save().then(menu => {
        res.status(200).json({
            name,
            title,
            show
        })
    })
    .catch(err => {
        console.log(err.errors.name.message)
        res.status(500).json({
            error : {
                message : "couldnt post this menu category to the database"
            }
        })
    });
})

export default router