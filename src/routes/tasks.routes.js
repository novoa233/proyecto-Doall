import {Router} from 'express'
const router = Router();
import {getTasks, createTask, getTask, updateTask, deleteTask, updateTaskprogress, updateTaskList} from '../controllers/tasks.controllers.js'

router.get('/tasks', getTasks)
router.post('/tasks', createTask)
router.put('/tasks/:id', updateTask) //para actualizar toda la tarea
router.put('/tasksprogress/:id', updateTaskprogress)//para actualizar el progreso de una tarea
router.put('/updateTaskList', updateTaskList)//para actualizar la lista a la que pertenece una tarea
router.delete('/tasks/:id', deleteTask)
router.get('/tasks/:id', getTask)



export default router