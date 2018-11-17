import express from "express"
import Product from "../models/Product"

const router  = express.Router()

router.get("/", (req, res) => {
    Product.find()
    .then(items => {
        res.status(200).json({
            items
        })
    })
    .catch({

    })
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    Product.findById(id)
    .then(data => {
        res.status(200).json({
            data
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message : "product could not be found"
            }
        })
    })
})

router.post("/", (req, res) => {
    const {price, available, name, image, description, menuCategoryId, ingredients} = req.body
    const newProduct = Product({
        price,
        available,
        name,
        image,
        description,
        menuCategoryId,
        ingredients
    })

    newProduct.save().then(product => {
        res.status(200).json({
            price,
            available,
            name,
            image,
            description,
            menuCategoryId,
            ingredients
        })
    })
    .catch(err => {
        res.status(500).json({
            error : {
                message : "could not add this product to the database"
            }
        })
    })
})

export default router