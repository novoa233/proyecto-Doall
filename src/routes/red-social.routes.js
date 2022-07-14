import {Router} from 'express';
const router=Router()
import{redSocial} from '../controllers/red-social.controllers.js'

router.get('/redsocial', redSocial)


export default router