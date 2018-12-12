import express from "express"

import FAQModel from '../../models/Abouts Models/FAQs'

const router = express.Router()

router.get("/", (req, res) => {
    FAQModel.find()
    .then (faqs => {
        res.status(200).json({
            faqs,
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

router.delete("/", (req, res) => {
    FAQModel.findByIdAndRemove(req.body._id)
    .then (result => {
        FAQModel.find()
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

router.post("/", (req, res) => {

    FAQModel.find()
    .then (faqs => {
        const question = new FAQModel({
            index:  faqs.length + 1,
            question : req.body.question,
            answer : req.body.answer
        })

        question.save()
        .then(faq => {
            res.status(200).json({
                faq,
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

router.patch("/", (req, res) => {
    FAQModel.findByIdAndUpdate(req.body._id, req.body, {new : true})
    .then(faq => {
        res.status(200).json({
            faq,
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