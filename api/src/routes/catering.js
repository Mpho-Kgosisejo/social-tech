import express from 'express'

import * as CateringController from '../controllers/Catering'
import {adminAuth, userAuth} from '../middleware/checkAuth'

const router = express.Router()

router.post('/', CateringController.add)
router.delete('/:id', adminAuth, CateringController.remove)
router.patch('/:id', adminAuth, CateringController.update)
router.get('/:id', adminAuth, CateringController.getOne)
router.get('/', adminAuth, CateringController.getAll)

export default router