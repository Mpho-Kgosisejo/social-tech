import express from "express"

import ChefModel from '../../models/Abouts Models/Chefs'

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

router.post("/", (req, res) => {

    const chef = new ChefModel({
        name : req.body.name,  
        speciality : req.body.speciality,
        background : req.body.background,
        image_url :  req.body.image_url,
        rating : req.body.rating
    })

    chef.save()
    .then(Chef => {
        res.status(200).json({
            Chef,
            message: "OK"
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