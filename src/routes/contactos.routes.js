import {Router} from 'express';
const router=Router()
import multer from 'multer'
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import{getContactos, postContacto, updateContacts, deleteContacts} from '../controllers/contactos.controllers.js'

//midlewares para esta ruta
///Multer para subir foto de perfil de contacto nuevo
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../contactsImg'),
    filename: (req, file, cb)=>{
        let nameFile =uuidv4() +path.extname(file.originalname.toLocaleLowerCase())
      cb(null, nameFile )
    }
  });
  
  const profileImg2=multer({
    storage:storage,
    dest: path.join(__dirname, 'contactsImg'),
    limits: { fileSize: 5000000},
    fileFilter: (req, file, cb)=>{
      const filetypes= /jpeg|jpg|png/;
      const mimetype= filetypes.test(file.mimetype)
      const extname= filetypes.test(path.extname(file.originalname))
      if(mimetype && extname){
        console.log("req.file desde storage==>",req.file)
        return cb(null, true)
      }
      cb("Error: el archivo debe ser una imagen válida")
    }
  }).single('foto');

  

router.get('/contactos', getContactos)
router.post('/contactos',profileImg2, postContacto)
router.put('/contactos/:id', updateContacts)
router.delete('/contactos', deleteContacts)


export default router