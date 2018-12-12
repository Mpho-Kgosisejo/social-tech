import express from "express"
import AboutModel from "../../models/Abouts Models/About"

const router  = express.Router()

router.get("/abouts", (req, res) => {
    AboutModel.find()
    .then(data => {
        res.status(200).json({
            data,
        })
    })
    .catch(err => {
        res.status(404).json({
            error: {
                message: err
            }
        })
    })
})

export default router