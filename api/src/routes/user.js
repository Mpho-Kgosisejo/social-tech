import express from "express"

import UserModel from "../models/User"
import parseErrors from "../utils/parseErrors"
import {sendConfirmationEmail} from "../mailer/mailer"

const router = express.Router()

router.post("/", (req, res) => {
    const {email, password, username} = req.body
    const newUser = new UserModel({email, username})

    newUser.setPassword(password)
    newUser.setConfirmation()
    newUser.save()
    .then(user => {
        sendConfirmationEmail(user)
        res.status(200).json({
            // user: user.toAuthJSON(),
            message: "OK"
        })
    })
    .catch(err => {
        console.log("catch:", err)
        res.status(400).json({
            error: {
                message: parseErrors({errors: err.errors})
            }
        })
    })
})

export default router