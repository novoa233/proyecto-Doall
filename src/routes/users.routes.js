import { Router } from "express";
const router = Router();
import multer from 'multer'
import path from "path";
import { v4 as uuidv4 } from 'uuid';


import { renderSignUpForm, singup,  validateUser, userLogout, saveMode} from "../controllers/users.controller";



//midlewares para esta ruta
///Multer para subir foto de perfil
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../profile_img'),
  filename: (req, file, cb)=>{
    let nameFile =uuidv4() +path.extname(file.originalname.toLocaleLowerCase())
    console.log(nameFile)
    cb(null, nameFile )
  }
});

const profileImg=multer({
  storage:storage,
  dest: path.join(__dirname, 'profile_img'),
  limits: { fileSize: 3000000},
  fileFilter: (req, file, cb)=>{
    const filetypes= /jpeg|jpg|png/;
    const mimetype= filetypes.test(file.mimetype)
    const extname= filetypes.test(path.extname(file.originalname))
    if(mimetype && extname){
     
      return cb(null, true)
    }
    cb("Error: el archivo debe ser una imagen válida")
  }
}).single('foto');

router.post("/login",profileImg, singup);
router.post('/validateuser', validateUser)
router.put('/saveconfigmode', saveMode)


router.get('/logout', userLogout)

// Routes
router.get("/users/signup", renderSignUpForm);

router.post("/users/signup",profileImg, singup);



export default router;
