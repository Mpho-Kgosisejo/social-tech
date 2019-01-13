import express from "express"

import {userAuth} from "../middleware/checkAuth"
import * as UserController from "../controllers/User"
import {multerUpload} from "../utils/multerImageHandler"

const router = express.Router()

router.post("/", UserController.register)
router.get("/", userAuth, UserController.get_info)
router.patch("/", userAuth, UserController.update_info)
router.patch("/avator", userAuth, multerUpload.single("avator"), UserController.update_avator)

export default router