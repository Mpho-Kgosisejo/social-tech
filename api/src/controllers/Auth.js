import jwt from "jsonwebtoken"

import UserModel from "../models/User"
import {sendResetPassword} from "../mailer/mailer"
import {adminAuth, userAuth} from "../middleware/checkAuth";

/**
 * Used to authenticate/signin/login the user.
 * 
 * @param req represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param req.body [Object: {login: [Object, {key: [String, "email/username"], value: [String]}], password: [String]}]
 * 
 * @param res represents the HTTP response when it gets an HTTP request.
 * @param res.success [Object: {user: {isAdmin: [Bool], username: [String], email: [String], avator: [String, "URL, without api host-address"], token: [String, "token which the user will user for authorised routers"]}, message: [Strign]}]
 * @param res.error [Object: {error: {message: [String]}}]
 */
export const authenticate  = (req, res) => {
    const {login, password} = req.body

    UserModel.findOne({[login.key]: login.value})
    .then(user => {
        if (user && user.isValidPassword(password)){
            if (user.emailConfirmed){
                res.status(200).json({
                    user: user.toAuthJSON(),
                    message: "OK"
                })
            }else{
                res.status(401).json({error: {message: "You must confirm email before you can login"}})
            }
        }else{
            res.status(401).json({error: {message: "Invalid credentials"}})
        }
    })
    .catch(err => {
        res.status(500).json({error: {message: "Invalid credentials"}})
    })
}

/**
 * Used to confirm user's account after signing-up/registering.
 * 
 * @param req represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param req.body [Object: {token: [String, "Given to user via email (through a link)"]}]
 * 
 * @param res represents the HTTP response when it gets an HTTP request.
 * @param res.success [Object: {message: [String]}]
 * @param res.error [Object: {error: {message: [String]}}]
 */
export const confirmAccount = (req, res) => {
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
                message: "Confirmation success"
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

}

/**
 * Used to request password reset. User will then get an email of a "link" to reset their password.
 * 
 * @param req represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param req.body [Object: {email: [String, "User's email..."]}]
 * 
 * @param res represents the HTTP response when it gets an HTTP request.
 * @param res.success [Object: {message: [String]}]
 * @param res.error [Object: {error: {message: [String]}}]
 */
export const requestPasswordReset = (req, res) => {
    const {email} = req.body

    UserModel.findOne({email})
    .then(user => {
        if (user){
            sendResetPassword(user)

            res.status(200).json({
                message: "Reset password email sent"
            })
        }else{
            res.status(401).json({
                error: {
                    message: "Invalid email"
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

/**
 * Used to reset/change user's password.
 * 
 * @param req represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param req.body [Object: {password: [String, "User's new password"], token: [String, "Token given to user via email (when they requested for 'password reset')"]}]
 * 
 * @param res represents the HTTP response when it gets an HTTP request.
 * @param res.success [Object: {message: [String]}]
 * @param res.error [Object: {error: {message: [String]}}]
 */
export const resetPassword = (req, res) => {
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
                            message: "Password changed successfully"
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
}

/**
 * Used to validate user's token.
 * 
 * @param req represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param req.headers.authorization [String, "User's token..."]
 * @param req.body [Object, {admin?: [Bool, "true to check admin token"]}]
 * 
 * @param res represents the HTTP response when it gets an HTTP request.
 * @param res.success [Object: {message: [String]}]
 * @param res.error [Object: {error: {message: [String]}}]
 */
export const validateToken = (req, res) => {
    const {admin} = req.body
    
    if (admin && admin === true){
        adminAuth(req, res, () => {
            res.status(200).json({
                message: "OK"
            })
        })
    }else{
        userAuth(req, res, () => {
            res.status(200).json({
                message: "OK"
            })
        })
    }
}