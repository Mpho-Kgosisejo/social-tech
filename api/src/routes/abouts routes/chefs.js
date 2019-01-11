import express from "express"

import ChefModel from '../../models/Abouts Models/Chefs'
import { multerUpload, removeFile } from "../../utils/multerImageHandler"


const router = express.Router()

router.get("/", (req, res) => {
    ChefModel.find()
    .then (chefs => {
        res.status(200).json({
            chefs
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

router.post("/", multerUpload.single('image'),(req, res) => {

    const chef = new ChefModel({
        name : req.body.name,  
        speciality : req.body.hierarchy,
        background : req.body.description,
        image_url :  `${process.env.HOST}/${req.file.path}`,
        rating : req.body.rating
    })

    chef.save()
    .then(Chef => {
        console.log(Chef)
        ChefModel.find()
        .then (chefs => {
            res.status(200).json({
                chefs
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
    .catch(err => {
        res.status(500).json({
            error: {
                message: err
            }
        })
    })
})

router.delete("/",(req, res) => {
    ChefModel.findByIdAndRemove(req.body._id)
    .then (result => {
        const imageToBeDeleted = req.body.image_url.split('/')[4]
        removeFile(`uploads/${imageToBeDeleted}`, (err) => {
            if (err){
                console.error("RemoveImage: ", err)
            }else{
                console.log("RemoveImage: OK")
            }
        })

        ChefModel.find()
        .then (chefs => {
            res.status(200).json({
                chefs,
                message : "successfully delete the chef profile from the database"
            })
        })
    })
    .catch (err => {
        res.status(501).json({
            error : {
                catch : err,
                message : "failed to delete the chef's profile from the database."
            }
        })
    })
})

router.patch("/", multerUpload.single('image_url'), (req, res) => {
    if (typeof(req.body.oldImagePath) !== 'undefined') {
        console.log(req.body)
        const {_id, speciality, name, background, oldImagePath, rating } = req.body
        const newImagePath = `${process.env.HOST}/${req.file.path}`

        const updateModel = {
            name,
            image_url : newImagePath,
            background,
            speciality,
            rating
        }

        ChefModel.findByIdAndUpdate(_id, updateModel, {new : true})
        .then (resp => {

            ChefModel.find()
            .then (chefs => {
                res.status(200).json({
                    chefs,
                    message : "successfully updated the chef."
                })
            })
            .catch (error => {
                res.status(500).json({
                    error : {
                        catch : error,
                        message : "failed to get updated list of chefs."
                    }
                })
            })

            const imageToBeDeleted = oldImagePath.split('/')[4]
            removeFile(`uploads/${imageToBeDeleted}`, (err) => {
                if (err){
                    console.error("update image: ", err)
                }else{
                    console.log("update image: OK")
                }
            })

        })
        .catch (error => {
            res.status(500).json({
                error : {
                    catch : error,
                    message : "failed to update the chef."
                }
            })
        })
    }
    else {
        const {_id, speciality, name, background, image_url, rating } = req.body
        
        const updateModel = {
            name,
            image_url,
            background,
            speciality,
            rating
        }

        ChefModel.findByIdAndUpdate(_id, updateModel, {new : true})
        .then (data => {
            ChefModel.find()
            .then (chefs => {
                res.status(200).json({
                    chefs,
                    message : "successfully updated the chef."
                })
            })
        })
        .catch(error => {
            res.status(501).json({
                error : {
                    catch : error,
                    message : "failed to update the chef."
                }
            })
        })
    }
})


export default router