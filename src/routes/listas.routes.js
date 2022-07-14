import {Router} from 'express';
const router=Router();
import {getLists, postLists, deleteLists, updateLista} from '../controllers/listas.controllers.js'


router.get('/:id_project/lists', getLists);
router.post('/:id_project/lists', postLists);
router.delete('/:id_project/lists', deleteLists);

router.put('/lista/:id', updateLista)


export default router