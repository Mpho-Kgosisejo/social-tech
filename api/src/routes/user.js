import express from "express"

import UserModel from "../models/User"
import parseErrors from "../utils/parseErrors"
import {sendConfirmationEmail} from "../mailer/mailer"
import {userAuth} from "../middleware/checkAuth"
import * as controller from "../controllers/user"
import {multerUpload} from "../utils/multerImageHandler"

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
        const errors = parseErrors({errors: err.errors})

        if (Object.keys(errors).length > 0){
            res.status(422).json({
                error: {
                    message: errors
                }
            })
        }else{
            res.status(500).json({
                error: {
                    message: "Something went wrong"
                }
            })
        }
    })
})

router.patch("/", userAuth, controller.update_info)

router.patch("/avator", userAuth, multerUpload.single("avator"), controller.update_avator)

export default router