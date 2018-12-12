import express from "express"
// import AboutModel from "../../models/Abouts Models/About"
import FAQModel from '../../models/Abouts Models/FAQs'
import StoryModel from '../../models/Abouts Models/Story'
import ContactUsModel from '../../models/Abouts Models/ContactUs'
import ChefModel from '../../models/Abouts Models/Chefs'


const router  = express.Router()

router.get("/", (req, res) => {
    FAQModel.find()
    .then (faqs => {
        StoryModel.find()
        .then (story => {
            ContactUsModel.find()
            .then (contacts => {
                ChefModel.find()
                .then (chefs => {
                    res.status(200).json({
                        chefs,
                        faqs,
                        our_story : story[0],
                        contact_us : contacts[0]
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
        })
    })
})

export default router