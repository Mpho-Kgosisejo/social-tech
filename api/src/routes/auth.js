import express from "express"

import * as AuthController from "../controllers/Auth"

const router = express.Router()

router.post("/", AuthController.authenticate)
router.post("/confirmation", AuthController.confirmAccount)
router.post("/reset-password", AuthController.requestPasswordReset)
router.post("/validate-token", AuthController.validateToken)
router.post("/change-password", AuthController.resetPassword)

export default router