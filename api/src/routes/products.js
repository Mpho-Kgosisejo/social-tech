import express from "express"

import Product from "../models/Product"
import {multerUpload} from "../utils/multerImageHandler"
import checkAuth from "../middleware/checkAuth"

const router  = express.Router()

router.get("/", (req, res) => {
    Product.find()
    .then(items => {
        res.status(200).json({
            items,
            message : "successfully retrieved products"
        })
    })
    .catch(error =>{
        console.log(error)
        res.status(500).json({
            error : {
                message : "Error while trying to retrieve products"
            }
        }) 
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
        console.log(err)
        res.status(500).json({
            error: {
                message : "product could not be found"
            }
        })
    })
})

router.post("/", checkAuth, multerUpload.single('productImage'), (req, res) => {
    const {price, available, name, description, menuCategoryId, ingredients} = req.body
    const image =  `${process.env.HOST}/${req.file.path}`
    const newProduct = new Product({
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
            product,
            message : "successfully added the product"
        })
    })
    .catch(err => {
        res.status(500).json({
            error : {
                catch: err,
                message : "could not add this product to the database"
            }
        })
    })
})

export default router