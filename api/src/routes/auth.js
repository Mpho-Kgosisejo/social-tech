import express from "express"
import jwt from "jsonwebtoken"

import UserModel from "../models/User"
import {sendResetPassword} from "../mailer/mailer"

const router = express.Router()

/*
    Response struct:
    {
        status: 200, ## status is auto added
        data: {
            ...,
            message: ""
        }
        error: {
            ...,
            message: ""
        }
    }
*/

router.post("/", (req, res) => {
    const {email, password} = req.body

    UserModel.findOne({email})
    .then(user => {
        if (user && user.isValidPassword(password)){
            if (user.emailConfirmed){
                res.status(200).json({
                    data: {
                        user: user.toAuthJSON(),
                        message: "OK"
                    }
                })
            }else{
                res.status(401).json({error: {message: "You must confirm email before you can login"}})
            }
        }else{
            res.status(401).json({error: {message: "Invalid credentials"}})
        }
    })
    .catch(err => {
        res.status(500).json({error: {message: "Something went wrong"}})
    })
})

router.post("/confirmation", (req, res) => {
    const {token} = req.body

    UserModel.findOneAndUpdate({
        confirmationToken: token
    }, {
        confirmationToken: "",
        emailConfirmed: true
    }, {new: true})
    .then(user => {
        if (user){
            res.status(200).json({
                data: {
                    message: "Confirmation success"
                }
            })
            return
        }else{
            res.status(400).json({
                error: {
                    message: "Invalid confirmation token"
                }
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: "Error confirming user"
            }
        })
    })

})

router.post("/reset-password", (req, res) => {
    const {email} = req.body

    UserModel.findOne({email})
    .then(user => {
        if (user){
            sendResetPassword(user)

            res.status(200).json({
                data: {
                    message: "Reset password email sent"
                }
            })
        }else{
            res.status(400).json({
                error: {
                    message: "Invalid email"
                }
            })
        }
    })
    .catch(err => {
        console.log("catch()", err)

        res.status(500).json({
            error: {
                message: "Something went wrong"
            }
        })
    })
})

router.post("/validate-token", (req, res) => {
    const {token} = req.body
    
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err){
            res.status(401).json({
                error: {
                    message: "Error verifying token"
                }
            })
        }else{
            res.status(200).json({
                data: {
                    message: "OK"
                }
            })
        }
    })
})

router.post("/change-password", (req, res) => {
    const {password, token} = req.body

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {   
        if (err){
            res.status(401).json({
                error: {
                    message: "Invalid token"
                }
            })
        }else{
            UserModel.findOne({
                _id: decoded._id
            })
            .then(user => {
                if (user){
                    user.setPassword(password)
                    user.save()
                    .then(() => {
                        res.status(200).json({
                            data: {
                                message: "Password reset success"
                            }
                        })
                    })
                }else{
                    res.status(404).json({
                        error: {
                            message: "Invalid token"
                        }
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: {
                        message: "Something went wrong"
                    }
                })
            })
        }
    })
})

export default router