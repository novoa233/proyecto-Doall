import { User } from "../models/User";
import { encryptPassword, matchPassword } from "../helpers/encrypterpass.js";
import passport from "passport";
import sharp from "sharp";
import { v4 as uuidv4 } from 'uuid';
import fs from "fs";
import path from "path";


export const renderSignUpForm = (req, res) => res.render("users/signup");

export const singup = async (req, res) => {
  console.log(req.file)
  console.log(req.body)
  let errors = [];
  const { nombre, apellido, email, password, confirm_password } = req.body;
  const { filename } = req.file;

  if (password != confirm_password) {
    errors.push({ text: "Las contraseñas no coinciden" });
  }
  if (password.length < 4) {
    errors.push({ text: "La contraseña debe tener almenos 4 carácteres" });
  }
  //buscar coincidencia de registros
  const emailUser = await User.findOne({ where: { email: email } });
  if (emailUser) {
    req.flash("error_msg", "El correo ingresado ya está registrado");
    res.redirect("/login");
  } else {
    const user = {
      id: uuidv4(),
      nombre,
      apellido,
      email,
      password: await encryptPassword(password),
      foto: `user-${filename.replace(path.extname(filename),'.png')}`,
      config: {
        language: "es",
        modo: "normal",
      },
    };

    if (errors.length > 0) {
      res.render("index", {
        errors,
        nombre,
        email,
        password,
        confirm_password,
      });
    } else {
      let ruta = __dirname.replace("controllers", "login_img");

      sharp(req.file.path)
        .resize(100)
        .toFormat('png', {palette: true})
        .toFile(ruta + `/user-${filename.replace(path.extname(filename),'.png')}`)
        .then(async (data) => {
          const newUser = await User.create(user);
          req.flash("success_msg", "Ya puedes iniciar sesión.");
          res.render("index", {
            email,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};

export const validateUser = async (req, res) => {
  let errors = [];
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    req.flash("error_msg", "El usuario no existe");
    return res.redirect("/login");
  }
  let match = await matchPassword(password, user.password);
  if (!match) {
    req.flash("error_msg", "La contraseña es incorrecta");
    return res.redirect("/login");
  } else {
    req.session.userId = user.dataValues.id;
    req.session.name = `${user.dataValues.nombre.toUpperCase()} ${user.dataValues.apellido.toUpperCase()}`;
    req.session.config = user.config;
    req.flash("mode", user.config.modo);
    fs.createReadStream(path.join(__dirname, '/../login_img')+`/${user.foto}`).pipe(fs.createWriteStream(path.join(__dirname, '../public/img')+'/imgProfile.png'))
    req.flash("user", req.session.name);
    return res.redirect("/projects");
  }
};

//ruta para guardar la configuracion del modo (dark o normal)
export const saveMode = async (req, res) => {
  // console.log(req.body);
  let mode, lang;
  let id_user = req.session.userId;

  try {
    const user_mode = await User.findByPk(id_user);
    mode = user_mode.config.modo;
    lang = user_mode.config.language;
    if (user_mode.config.modo == "dark") {
      mode = "normal";
    } else {
      mode = "dark";
    }
    // console.log(user_mode.dataValues)
    await user_mode.update(
      {
        config: {
          modo: mode,
          language: lang,
        },
      },
      {
        where: { id: id_user },
      }
    );
    res.json({ modo: user_mode.config.modo });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//ruta para salir
export const userLogout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

// export const renderSigninForm = (req, res) => res.render("users/signin");
export const renderSigninForm = (req, res) => res.render("/login");

export const signin = passport.authenticate("local", {
  successRedirect: "/projects",
  failureRedirect: "/login",
  failureFlash: true,
});

export const logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Has salido con éxito");
  res.redirect("/login");
};
