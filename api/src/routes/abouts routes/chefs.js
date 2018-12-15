import express from "express"

import ChefModel from '../../models/Abouts Models/Chefs'
import { multerUpload, removeFile } from "../../utils/multerImageHandler"


const router = express.Router()

router.get("/", (req, res) => {
    ChefModel.find()
    .then (chefs => {
        res.status(200).json({
            chefs
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: err
            }
        })
    })
})

router.post("/", multerUpload.single('image'),(req, res) => {

    const chef = new ChefModel({
        name : req.body.name,  
        speciality : req.body.hierarchy,
        background : req.body.description,
        image_url :  `${process.env.HOST}/${req.file.path}`,
        rating : req.body.rating
    })

    chef.save()
    .then(Chef => {
        console.log(Chef)
        ChefModel.find()
        .then (chefs => {
            res.status(200).json({
                chefs
            })
        })
        .catch(err => {
            res.status(500).json({
                error: {
                    message: err
                }
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: err
            }
        })
    })
})

export default router