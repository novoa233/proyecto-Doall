import {User} from '../models/User.js'
import { Project } from "../models/Project.js";
import {Task} from '../models/Task.js'
import {Contacto} from '../models/Contacto.js'
import {sequelize} from '../database/database.js'
import { v4 as uuidv4 } from 'uuid';


export const getProjects = async (req, res) => {
  let id_user=req.session.userId
  console.log(req.session)


  if(!id_user){
    //si el id del usuario no existe
    return res.redirect('/login')
  }

  try {
    const projects = await Project.findAll({where: {userId: id_user}});
    req.flash("user", req.session.name);
    res.render('projects', {
      projects: projects,
      user: req.session.name,
      mode: req.session.config.modo
      })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getProject= async (req, res) => {
try {
  const {id}= req.params
  const project= await Project.findOne({ where: {id: id} });

  if(!project){
    return res.status(404).json({message: 'Proyecto no encontrado'})
  }
  res.redirect('/project')
} catch (error) {
  return res.status(500).json({
    message: error.message,
  });
}
}

export const createProject = async (req, res) => {
  const id_user=req.session.userId
  console.log(id_user)
  const { nombre, descripcion, prioridad, fecha_inicio, estado } = req.body;
  try {
    const newProject = await Project.create({
      id: uuidv4(),
      nombre,
      descripcion,
      prioridad,
      fecha_inicio,
      estado,
      userId: id_user
    });
    res.json(newProject);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  const user=req.session.userId
  const { id } = req.params;
  const{nombre, prioridad, descripcion, fecha_inicio,estado}= req.body
  try {
   const project= await Project.findByPk(id)
   project.nombre =nombre;
   project.prioridad = prioridad;
   project.descripcion = descripcion;
   project.fecha_inicio=fecha_inicio;
   project.estado=estado;
   await project.save();
    res.json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.destroy({
      where: { id: id },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProjectTasks= async (req, res) => {
  const {id}= req.params
  const tasks= await Task.findAll({ 
    where: { 
      projectId: id },
  });
  res.json(tasks)
}

export const getAllProjectsJson=async(req, res)=>{
  const id_user = req.session.userId
    const user = await User.findOne({ where: { id: id_user } });
    if(!user){
        return res.status(404).json({message: 'Usuario no existe'})
    }
    delete user.dataValues.password
    const projects = await Project.findAll({where: {userId: id_user}});
   
    const contacts=await Contacto.findAll({where: {userId: id_user}})

    let consulList=`select listas.id, listas.name, listas.config, listas."projectId" from users left join projects on projects."userId"=users.id left join listas on projects.id=listas."projectId" where users.id='${id_user}' and listas."projectId" is not null;`
    let lists;
    let tasks;
    try {
        lists = await sequelize.query(consulList);   
        } catch (error) {
            console.log("no existen listas aun")
            lists=[];
            tasks=[]; 
            let data={user, projects, contacts, lists, tasks}
            return res.json(data)
        }
  
    let consulTask=`select tasks.id, tasks.titulo, tasks.tarea, tasks.fecha_limite, tasks.progreso, tasks.asignacion, tasks.config, tasks.done, tasks.id_lista from users left join projects on projects."userId"=users.id left join listas on projects.id=listas."projectId" left join tasks on listas.id=tasks.id_lista where users.id='${id_user}' and tasks.id_lista is not null;`
    try {
        const tasks=await sequelize.query(consulTask);

        if(tasks[0].length == 0){
            tasks=[]; 
            let data={user, projects, contacts, lists:lists[0], tasks}
            return res.json(data)
        }else{
          let data={user, projects, contacts, lists: lists[0], tasks: tasks[0]}
          return res.json(data)
        }

    } catch (error) {
        console.log("no existen tareas aun")
        tasks=[]; 
        let data={user, projects, contacts, lists:lists[0], tasks}
        return res.json(data)
    }
   

};