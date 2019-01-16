import express from "express"

import * as UserController from "../controllers/User"
import {userAuth, adminAuth} from "../middleware/checkAuth"
import {multerUpload} from "../utils/multerImageHandler"

const router = express.Router()

router.post("/", UserController.register)
router.get("/", userAuth, UserController.get_info)
router.patch("/", userAuth, UserController.update_info)
router.patch("/avator", userAuth, multerUpload.single("avator"), UserController.update_avator)

//these will be handled by the admin in the dashboard, hence they require the admin's Authorization

router.get("/all", adminAuth, UserController.get_all_users)

router.delete("/delete-user", adminAuth, UserController.delete_user)

router.patch("/handle-admin-rights", adminAuth, UserController.handle_admin_rights)

export default router