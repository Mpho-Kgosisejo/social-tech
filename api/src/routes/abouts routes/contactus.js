import express from "express"

import ContactUsModel from '../../models/Abouts Models/ContactUs'

const router = express.Router()

router.get("/", (req, res) => {
    ContactUsModel.find()
    .then (contacts => {
        res.status(200).json({
            contact_us : contacts,
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

router.post("/", (req, res) => {

    ContactUsModel.db.db.listCollections({name: 'contactus'})
    .next((err, collinfo) => {
        if (collinfo) {
            ContactUsModel.findByIdAndUpdate(req.body._id, req.body, {new : true})
            .then(contact_us => {
                res.status(200).json({
                    contact_us,
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
        else{
            const contacts = new ContactUsModel({
                header: req.body.header,
                sub_header: req.body.sub_header,
                address_1: req.body.address_1,
                address_2: req.body.address_2,
                address_3: req.body.address_3,
                city: req.body.city,
                tel: req.body.tel,
                fax: req.body.fax,
                chefs_phone: req.body.chefs_phone,
                business_hours: req.body.business_hours,
            })
        
            contacts.save()
            .then(contact_us => {
                res.status(200).json({
                    contact_us,
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


router.post("/", (req, res) => {

    

    const contacts = new ContactUsModel({
        header: req.body.header,
        sub_header: req.body.sub_header,
        address_1: req.body.address_1,
        address_2: req.body.address_2,
        address_3: req.body.address_3,
        city: req.body.city,
        tel: req.body.tel,
        fax: req.body.fax,
        chefs_phone: req.body.chefs_phone,
        business_hours: req.body.business_hours,
    })

    contacts.save()
    .then(contact_us => {
        res.status(200).json({
            contact_us,
            message: "OK"
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: res
            }
        })
    })
})

export default router