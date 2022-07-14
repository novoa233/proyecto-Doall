import {Router} from 'express';
const router=Router();
import {dataUser} from '../controllers/prueba.js'

router.get('/login', (req, res) => {

    res.render('index')
})


router.get('/data/:userId', dataUser)


export default router