import express from "express"

import Product from "../models/Product"
import { multerUpload, removeFile } from "../utils/multerImageHandler"
import { adminAuth } from "../middleware/checkAuth"
import { insertionSortProductsByMostSold } from "../utils/sortProductsAlgo";

const router  = express.Router()

router.get("/", (req, res) => {
    Product.find()
    .then(items => {
        // const ite_ms = insertionSortProductsByMostSold(items)
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

router.post("/", adminAuth, multerUpload.single('productImage'), (req, res) => {
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
        Product.find()
        .then (products => {
            res.status(200).json({
                products,
                message : "successfully added the product"
            })
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

router.delete("/", adminAuth,(req, res) => {
    Product.findByIdAndRemove(req.body._id)
    .then (result => {
        const imageToBeDeleted = req.body.image.split('/')[4]
        removeFile(`uploads/${imageToBeDeleted}`, (err) => {
            if (err){
                console.error("RemoveImage: ", err)
            }else{
                console.log("RemoveImage: OK")
            }
        })

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

router.patch("/", adminAuth,multerUpload.single('productImage'), (req, res) => {
    if (typeof(req.body.oldImagePath) !== 'undefined') {
        console.log(req.body)
        const {_id, price, available, name, description, menuCategoryId, ingredients, oldImagePath } = req.body
        const newIngredients = JSON.parse(ingredients)
        const newImagePath = `${process.env.HOST}/${req.file.path}`

        const updateModel = {
            price,
            available,
            name,
            image : newImagePath,
            description,
            menuCategoryId,
            ingredients : newIngredients
        }

        Product.findByIdAndUpdate(_id, updateModel, {new : true})
        .then (resp => {

            Product.find()
            .then (data => {
                res.status(200).json({
                    data,
                    message : "successfully updated the product."
                })
            })
            .catch (error => {
                res.status(500).json({
                    error : {
                        catch : error,
                        message : "failed to get updated list of products."
                    }
                })
            })

            const imageToBeDeleted = oldImagePath.split('/')[4]
            removeFile(`uploads/${imageToBeDeleted}`, (err) => {
                if (err){
                    console.error("update image: ", err)
                }else{
                    console.log("update image: OK")
                }
            })

        })
        .catch (error => {
            res.status(500).json({
                error : {
                    catch : error,
                    message : "failed to update the product."
                }
            })
        })
    }
    else {
        const {_id, price, available, name, description, menuCategoryId, ingredients, image } = req.body

        const updateModel = {
            price,
            available,
            name,
            image ,
            description,
            menuCategoryId,
            ingredients 
        }

        Product.findByIdAndUpdate(_id, updateModel, {new : true})
        .then (data => {
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

//this endpoint will be used to get all the top selling products
// router.get("/top", (req, res) => { 
//     Product.find()
//     .then(items => {
//         res.status(200).json({
//             items,
//             message : "successfully retrieved products"
//         }) 
//     })
//     .catch(error =>{
//         console.log(error)
//         res.status(500).json({
//             error : {
//                 message : "Error while trying to retrieve products"
//             }
//         })
//     })
//  })

// router.get("/top-selling", (req, res) => {
    
//     Product.find()
//     .then(items => {
//         res.status(200).json({
//             items,
//             message : "successfully retrieved products"
//         }) 
//     })
//     .catch(error =>{
//         console.log(error)
//         res.status(500).json({
//             error : {
//                 message : "Error while trying to retrieve products"
//             }
//         })
//     })
// })

export default router
