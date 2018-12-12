import express from "express"
import { adminAuth } from "../../middleware/checkAuth"
import mongoose from 'mongoose'

import StoryModel from '../../models/Abouts Models/Story'

const router = express.Router()

router.get("/", (req, res) => {
    StoryModel.find()
    .then (ourstory => {
        res.status(200).json({
            our_story : ourstory,
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

router.post("/", adminAuth, (req, res) => {

    StoryModel.db.db.listCollections({name: 'ourstories'})
    .next((err, collinfo) => {
        if (collinfo) {
            StoryModel.findByIdAndUpdate(req.body._id, req.body, {new : true})
            .then(ourstory => {
                res.status(200).json({
                    ourstory,
                    message: "OK"
                })
            })
            .catch(errr => {
                res.status(500).json({
                    error: {
                        message: errr
                    }
                })
            })
        }
        else{
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
                        message: err
                    }
                })
            })
        }
    });    
})

export default router