import express from "express"
import { adminAuth } from "../middleware/checkAuth"
import mongoose from 'mongoose'

import NetEarning from "../models/NetEarning";
import { addUpdateNet } from "../controllers/netearning";

const router = express.Router()

router.get("/",adminAuth, (req, res) => {
    NetEarning.findOne()
    .then (netearnings => {
        res.status(200).json({
            netearnings ,
            message : "okay"
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

router.post("/", addUpdateNet)

export default router