import UserModel from "../models/User"
import { removeFile } from "../utils/multerImageHandler";
import parseErrors from "../utils/parseErrors"
import {sendConfirmationEmail} from "../mailer/mailer"

/**
 * Used to register a user, they will get an email with a link to confirm their registration.
 * 
 * @param req represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param req.body [Object, {email: [String], username: [String], password: [String]}]
 * 
 * @param res represents the HTTP response when it gets an HTTP request.
 * @param res.success [Object: {message: [String]}]
 * @param res.error [Object: {error: {message: [String]}}]
 */
export const register = (req, res) => {
    const {email, password, username} = req.body
    const newUser = new UserModel({email, username})

    newUser.setPassword(password)
    newUser.setConfirmation()
    newUser.save()
    .then(user => {
        sendConfirmationEmail(user)
        res.status(200).json({
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
}

/**
 * [Authorization Required]
 * Used to update/patch user's details.
 * 
 * @param req represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param req.headers.authorization [String, "User's token"]
 * @param req.body [Object, {firstname: [String], lastname: [String], phone: [String], address: [String]}]
 * 
 * @param res represents the HTTP response when it gets an HTTP request.
 * @param res.success [Object: {message: [String]}]
 * @param res.error [Object: {catch: [Object, "Catched error..."], error: {message: [String]}}]
 */
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

/**
 * [Authorization Required]
 * Used to update/patch user's avator (profile picture).
 * 
 * Re
 * 
 * @param req represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param req.headers.authorization [String, "User's token"]
 * @param req.file.path [String, "file (image path)"]
 * 
 * @param res represents the HTTP response when it gets an HTTP request.
 * @param res.success [Object: {avator: [String, "image URL (without api host-address)"]}]
 * @param res.error [Object: {catch: [Object, "Catched error..."], error: {message: [String]}}]
 */
export const update_avator = (req, res) => {
    const {key} = req.auth_data

    UserModel.findById(key)
    .then(user => {
        if (user.image) {
            // Remove image of: user.image
            removeFile(user.image, (err) => {
                if (err){
                    // console.error("RemoveImage: ", err)
                }else{
                    // console.log("RemoveImage: OK")
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

/**
 * [Authorization Required]
 * Used to get user's information.
 * 
 * @param req represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param req.headers.authorization [String, "User's token"]
 * 
 * @param res represents the HTTP response when it gets an HTTP request.
 * @param res.success [Object: {user: [Object: {createdAt: [String], updatedAt: [String], email: [String], username: [String], address: [String], phone: [String], image: [String], admin: [String], lastname: [String], firstname: [String]}], message: [String]}]
 * @param res.error [Object: {error: {message: [String]}}]
 */
export const get_info = (req, res) => {
    const {key} = req.auth_data

    UserModel.findById(key)
    .then(user => {
        if (user){
            const { createdAt, updatedAt, email, username, address, phone, image, admin, lastname, firstname } = user
            
            res.json({
                user: {
                    createdAt,
                    updatedAt,
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