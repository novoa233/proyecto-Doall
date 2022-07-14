// let ruta=__dirname.replace('controllers', 'login_img')
// console.log(ruta)
import { User } from "../models/User";
import { Project } from "../models/Project.js";
import { Lista } from "../models/Listas.js";
import {Task} from '../models/Task.js'
import {sequelize} from '../database/database.js'

export const dataUser=async(req, res)=>{

    const id_user = req.params.userId
    const user = await User.findOne({ where: { id: id_user } });
    if(!user){
        return res.status(404).json({message: 'Usuario no existe'})
    }
    delete user.dataValues.password
    const projects = await Project.findAll({where: {userId: id_user}});
   

    let consulList=`select listas.id, listas.name, listas.config, listas."projectId" from users left join projects on projects."userId"=users.id left join listas on projects.id=listas."projectId" where users.id='${id_user}' and listas."projectId" is not null;`
    let lists;
    try {
        lists = await sequelize.query(consulList);   
    } catch (error) {
        console.log("no existen listas aun")
        lists=[]; 
        let data={user, projects, lists}
        return res.json(data)
    }
  
    let consulTask=`select tasks.id, tasks.name, tasks.done, tasks.id_lista from users left join projects on projects."userId"=users.id left join listas on projects.id=listas."projectId" left join tasks on listas.id=tasks.id_lista where users.id='${id_user}' and tasks.id_lista is not null;`
    let tasks;
    try {
        const tasks=await sequelize.query(consulTask);
        if(tasks[0].length==0){
            tasks=[]; 
            let data={user, projects, list:lists[0], tasks}
            return res.json(data)
        }


    } catch (error) {
        console.log("no existen tareas aun")
        tasks=[]; 
        let data={user, projects, list:lists[0], tasks}
        return res.json(data)
    }

    let data={user, projects, list: lists[0], tasks: tasks[0]}

    res.json(data)
}