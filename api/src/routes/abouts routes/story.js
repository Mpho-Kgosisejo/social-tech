import express from "express"
import { adminAuth } from "../../middleware/checkAuth"

import StoryModel from '../../models/Abouts Models/Story'

const router = express.Router()

router.post("/", adminAuth, (req, res) => {

    const story = new StoryModel({
        description : req.body.description,
        tags : req.body.tags
    })

    story.save()
    .then(ourstory => {
        res.status(200).json({
            ourstory,
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

export default router