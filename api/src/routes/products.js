import express from "express"

import Product from "../models/Product"
import { multerUpload, removeFile } from "../utils/multerImageHandler"
// import checkAuth from "../middleware/checkAuth"

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

router.post("/", multerUpload.single('productImage'), (req, res) => {
    const {price, available, name, description, menuCategoryId, ingredients} = req.body
    const newIngredients = JSON.parse(ingredients)
    const image =  `${process.env.HOST}/${req.file.path}`
    const newProduct = new Product({
        price,
        available,
        name,
        image,
        description,
        menuCategoryId,
        ingredients : newIngredients
    })


    newProduct.save().then(product => {
        res.status(200).json({
            product,
            message : "successfully added the product"
        })
    })
    .catch(err => {
        res.status(501).json({
            error : {
                catch: err,
                message : "could not add this product to the database"
            }
        })
    })
})

router.delete("/", (req, res) => {
    Product.findByIdAndRemove(req.body._id)
    .then (result => {
        Product.find()
        .then (data => {
            res.status(200).json({
                data,
                message : "successfully delete the product from the database"
            })
        })
    })
    .catch (err => {
        res.status(501).json({
            error : {
                catch : err,
                message : "failed to delete this product from the database."
            }
        })
    })
})

router.patch("/", multerUpload.single('productImage'), (req, res) => {
    if (typeof(req.body.oldImagePath) !== 'undefined') {
        const imageToBeDeleted = req.body.oldImagePath.split('/')[4]
        console.log('uploads/',imageToBeDeleted)
        removeFile(`uploads/${imageToBeDeleted}`)
    }
    else {
        const updateModel = req.body

        Product.findByIdAndUpdate(req.body._id, updateModel, {new : true})
        .then (data => {
            console.log(data)
            Product.find()
            .then (result => {
                res.status(200).json({
                    result,
                    message : "successfully updated the product."
                })
            })
        })
        .catch(error => {
            res.status(501).json({
                error : {
                    catch : error,
                    message : "failed to update the product."
                }
            })
        })
    }
})

export default router
