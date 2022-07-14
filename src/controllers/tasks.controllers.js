import {Task} from '../models/Task.js'

export const getTasks=async(req, res) =>{
    try {
        const tasks= await Task.findAll()
        res.json(tasks)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
};

export const createTask=async(req, res) =>{
    try {
        const {id, titulo, tarea, fecha_limite, progreso, asignacion, config, done, id_lista}=req.body
        const newTask=await Task.create({
            id,
            titulo,
            tarea,
            fecha_limite,
            progreso,
            asignacion,
            config,
            done,
            id_lista
        });
        res.json(newTask)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
};

export const getTask=async(req, res) =>{
   try {
    const {id}= req.params
    const task= await Task.findOne({where: {id}})

    if(!task)return res.status(404).json({message:"Tarea no encontrada"})
    res.json(task)
   } catch (error) {
       res.status(500).json({message:"Algo salió mal"})
   }
};

export const updateTask=async(req, res) =>{
    try {
        const {id}=req.params
        const task= await Task.findOne({where:{id}});
        task.set(req.body);
        await task.save();
        return res.json(task)
    
    } catch (error) {
        return res.status(500).json({message:"Falla actualización de tarea", error: error.message})
    }
}

export const updateTaskprogress=async(req, res)=>{
    try {
        const {id}=req.params
        const {progreso}=req.body
        const task= await Task.findOne({where:{id}});
        task.progreso=progreso;
        await task.save();
        return res.json(task)
    
    } catch (error) {
        return res.status(500).json({message:"La actualizacion del parámetro progreso ha fallado", error: error.message})
    }
}
export const deleteTask=async(req, res) =>{
    try {
        const {id}= req.params
        const task= await Task.destroy({where: {id}})
    
        if(!task)return res.status(404).json({message:"Tarea no encontrada"})
        res.sendStatus(204)
       } catch (error) {
           res.status(500).json({message:"Error en el servidor al eliminar la tarea", error: error})
       }
}

export const updateTaskList=async(req, res)=>{
    try {
        const {id, id_lista}=req.body
        console.log('id',id)
        console.log('id_lista',id_lista)
        const task= await Task.findOne({where:{id}});
        task.id_lista=id_lista;
        await task.save();
        if(!task)return res.status(404).json({message:"Tarea no encontrada"})
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({message:"Error en el servidor al actualizar la pertenencia de la tarea", error: error})
    }
    
}