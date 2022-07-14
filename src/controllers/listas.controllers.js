import { Lista } from "../models/Listas.js";
import { v4 as uuidv4 } from 'uuid';

export const getLists=async(req, res) =>{
    const id_project=req.params.id_project
    const lists=await Lista.findAll(
        {where: {
            projectId: id_project
        },
        order: [['createdAt', 'DESC']]
    })
    res.json(lists)
};

//para crear listas
export const postLists=async (req, res) =>{
    const id_project=req.params.id_project
    const { name, config}=req.body

    const objList={
        "id": uuidv4(),
        "name": name,
        "config": config,
        "projectId": id_project
    }
    const newlista= await Lista.create(objList)
    res.json(newlista)
}


export const deleteLists=async(req, res) =>{
    try {
        const {id_project}= req.params
        const {id_panel}=req.body       
        const list= await Lista.destroy({where: {id:id_panel}})
        if(!list)return res.status(404).json({message: "Lista no encontrada"});
       return res.json(list)
    } catch (error) {
        return res.status(500)
    }    
}
export const updateLista=async(req, res) =>{
try {
    const {id}=req.params
    const list= await Lista.findByPk(id)
    list.config=req.body.config
    list.name=req.body.name
    await list.save();
    res.json(list)

} catch (error) {
    return res.status(500).json({message:"Falla actualizacion de lista"})
}

}