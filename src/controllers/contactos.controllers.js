import { Contacto } from "../models/Contacto.js";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import sharp from "sharp";



export const getContactos=async(req, res)=>{
  let id_user=req.session.userId
  
  if(!id_user){
    //si el id del usuario no existe
    return res.redirect('/login')
  }
  try {
    const allContacts= await Contacto.findAll({ where: { userId: req.session.userId } })
  
    
    if(allContacts.length > 0){
      res.render('contactos',{
        contacts: allContacts,
        user: req.session.name,
        mode: req.session.config.modo
      })
      
    }else{
      console.log('Sin contactos que mostrar')
      res.render('contactos',{
        user: req.session.name,
        mode: req.session.config.modo
      })
    };
  }catch (error) {
    console.log('Ocurrió un error: ', error)
    res.render('contactos',{
      user: req.session.name,
      mode: req.session.config.modo
    })
  };
};

export const postContacto=async(req, res)=>{
    let errors = [];
    const nombre =req.body.name_new_contact;
    const apellido =req.body.last_name_new_contact;
    const email=req.body.email_new_contact;
    const telefono=req.body.phone_new_contact;
    const config={
        empleo: req.body.job_new_contact
    };
    const nota=req.body.note_new_contact;
    const { filename } = req.file;

    const contac={
        id: uuidv4(),
        nombre,
        apellido,
        email,
        telefono,
        nota,
        config,
        userId: req.session.userId,
        foto: `contac-${filename.replace(path.extname(filename),'.png')}`,

    };

    let ruta = __dirname.replace("controllers", "public");
    let ruta2=path.join(ruta, 'img');
    let ruta3=path.join(ruta2, 'contacts')

    sharp(req.file.path)
        .resize(100)
        .toFormat('png', {palette: true})
        .toFile(ruta3 + `/contac-${filename.replace(path.extname(filename),'.png')}`)
        .then(async (data) => {
          const newContac = await Contacto.create(contac);
            // console.log('newContac==>', newContac)
          const allContacts= await Contacto.findAll({ where: { userId: req.session.userId } })
          
          req.flash("success_msg", "Nuevo contacto guardado con exito");
          res.render("contactos", {
            contacts: allContacts,
            user: req.session.name,
            mode: req.session.config.modo
          });
        })
        .catch((err) => {      
            console.log('Ocurrió un error',err);
            res.render("contactos", {
              contacts: allContacts,
              user: req.session.name,
              mode: req.session.config.modo
            });
        });

   
};

export const updateContacts=async (req, res) => {
  console.log(req.body)
  const id= req.params.id;

  
  try {
    const contact= await Contacto.findOne({ where: { id }});
    console.log(contact)
    contact.nombre =req.body.nombre;
    contact.apellido =req.body.apellido;
    contact.email=req.body.email;
    contact.telefono=req.body.telefono;
    contact.config={
        empleo: req.body.empleo
    };
    contact.nota=req.body.nota;

    await contact.save();
    const allContacts= await Contacto.findAll({ where: { userId: req.session.userId } })

    res.render('contactos',{
      user: req.session.name,
      mode: req.session.config.modo,
      contacts: allContacts,
    })
    } catch (error) {
      res.status(500).json({message:"Error en el servidor al actualizar los datos del contacto", error: error})
    }

}

export const deleteContacts=async (req, res) => {
try {
  const id= req.body.id
  const contact= Contacto.destroy({ where: {id }});
  console.log(contact)
  const allContacts= await Contacto.findAll({ where: { userId: req.session.userId } })

  res.render('contactos',{
    user: req.session.name,
    mode: req.session.config.modo,
    contacts: allContacts,
  })
} catch (error) {
  res.status(500).json({message:"Error en el servidor al tratar de eliminar el contacto", error: error})
}

  console.log(req.body.id)
}