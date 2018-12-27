import path from "path"
import fs from "fs"

import UserModel from "../models/User"
import { removeFile } from "../utils/multerImageHandler";

export const update_info = (req, res) => {
    const {key} = req.auth_data
    const {firstname, lastname, phone, address} = req.body

    UserModel.findByIdAndUpdate({_id: key}, {
        firstname,
        lastname,
        phone,
        address
    }, {new: true})
    .then(user => {
        res.json({
            user,
            message: "OK"
        })
    })
    .catch(err => {
        res.status(500).json({
            catch: err,
            error: {
                message: "Error updating user"
            }
        })
    })
}

export const update_avator = (req, res) => {
    const {key} = req.auth_data

    UserModel.findById(key)
    .then(user => {
        if (user.image) {
            // Remove image of: user.image
            removeFile(user.image, (err) => {
                if (err){
                    console.error("RemoveImage: ", err)
                }else{
                    console.log("RemoveImage: OK")
                }
            })
        }

        UserModel.findByIdAndUpdate({_id: key}, {
            image: req.file.path
        }, {new: true})
        .then(user => {
            res.json({
                avator: user.image,
                message: "OK"
            })
        })
        .catch(err => {
            res.status(500).json({
                catch: err,
                error: {
                    message: "Error updating user [1]"
                }
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            catch: err,
            error: {
                message: "Error updating user [2]"
            }
        })
    })
}

export const get_info = (req, res) => {
    const {key} = req.auth_data

    UserModel.findById(key)
    .then(user => {
        if (user){
            const { createdAt, email, username, address, phone, image, admin, lastname, firstname } = user
            
            res.json({
                user: {
                    createdAt,
                    email,
                    username,
                    address,
                    phone,
                    image,
                    admin,
                    lastname,
                    firstname
                },
                message: "OK"
            })
        }else{
            res.status(404).json({
                error: {
                    message: "User info not found [1]"
                }
            })
        }
    })
    .catch(err => {
        res.status(404).json({
            catch: err,
            error: {
                message: "User info not found [2]"
            }
        })
    })
}

export const get_all_users = (req, res) => {

    UserModel.find()
    .then(users => {
        if (users){   
            res.json({
                users,
                message: "OK"
            })
        }else{
            res.status(404).json({
                error: {
                    message: "failed to get all users [1]"
                }
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(404).json({
            catch: err,
            error: {
                message: "failed to get all users [2]"
            }
        })
    })
}

export const handle_admin_rights = (req, res) => {

    let newBody = false
    if (req.body.admin)
        newBody = false
    else 
        newBody = true

    UserModel.findByIdAndUpdate(req.body._id, { admin : newBody}, {new : true})
    .then(user => {
        console.log(user)
        UserModel.find()
        .then(users => {
            if (users){   
                res.json({
                    users,
                    message: "updated the user"
                })
            }else{
                res.status(404).json({
                    error: {
                        message: "failed to grant administrative rights [1]"
                    }
                })
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(404).json({
            catch: err,
            error: {
                message: "failed to grant adminstrative rights [2]"
            }
        })
    })
}

export const delete_user = (req, res) => {
    UserModel.findByIdAndRemove(req.body._id)
    .then(user => {
        console.log(user)
        UserModel.find()
        .then(users => {
            if (req.body.image !== "")
            {
                const imageToBeDeleted = req.body.image.split('/')[4]
                removeFile(`uploads/${imageToBeDeleted}`, (err) => {
                    if (err){
                        console.error("RemoveImage: ", err)
                    }else{
                        console.log("RemoveImage: OK")
                    }
                })
            }

            if (users){   
                res.json({
                    users,
                    message: "deleted the user"
                })
            }else{
                res.status(404).json({
                    error: {
                        message: "failed to get delete user [1]"
                    }
                })
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(404).json({
            catch: err,
            error: {
                message: "failed to get delete users [2]"
            }
        })
    })
}