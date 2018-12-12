import express from "express"

import FAQModel from '../../models/Abouts Models/FAQs'

const router = express.Router()

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
                message: "OK"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: {
                    message: res
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