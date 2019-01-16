import express from "express"

import OrderModel from "../models/Orders"
import parseErrors from "../utils/parseErrors"
import {userAuth, adminAuth} from "../middleware/checkAuth"
import * as controller from "../controllers/order"
import {multerUpload} from "../utils/multerImageHandler"

const router = express.Router()

router.get("/", controller.get_orders)

router.post("/", userAuth, controller.add_order)

router.get("/:id", controller.get_order)
    
router.patch("/", controller.update_order) 

router.delete("/", controller.delete_order) 

//TD:LR this one will get all the orders for a specific user, to be used in the user's profile page
router.get("/:uid", controller.get_user_orders)

export default router