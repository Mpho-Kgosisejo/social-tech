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
