import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import morgan from "morgan";
import session from "express-session";
import flash from "connect-flash";
import projectsRoutes from './routes/projects.routes.js'
import tasksRoutes from './routes/tasks.routes.js'
import usersRoutes from './routes/users.routes'
import redsocial from './routes/red-social.routes.js'
import contactos from './routes/contactos.routes.js'
import listas from './routes/listas.routes.js'
import indexRoutes from './routes/index.routes.js'
import cors from 'cors'
import passport from "passport";
// import dataUsers from './routes/index.routes.js'
import cookieParser from 'cookie-parser'


import main from './database/start_bd.js' //para iniciar la base de datos
main()

const Handlebars = require('handlebars');

import  './models/sessions.js'
import {sequelize} from "./database/database.js";

var SequelizeStore = require("connect-session-sequelize")(session.Store)

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
import config from './config.js';
import moment from 'moment';
moment.locale('es')
moment().format();

const app=express();

// Configuraciones
app.set("port", config.PORT);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: {
        inc: function (value, options) {
          return parseInt(value) + 1;
        },
        fecha: function(value){
            return moment(value).format('L');
        },
        class_projects: function(value){
          if(value=="Pendiente"){
            return "pending"
          }
          if(value=="En proceso"){
            return "process"
          }
          if(value=="Terminado"){
            return "completed"
          }
        }
    },
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);
app.set("view engine", ".hbs");

//Middlewares
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json())

function extendDefaultFields(defaults, session) {
  return {
    data: defaults.data,
    expires: defaults.expires,
    userId: session.userId,
    name: session.name,
    config: session.config
  };
}

const store = new SequelizeStore({
  db: sequelize,
  table: "Session",
  extendDefaultFields: extendDefaultFields,
});


app.use(
  session({
    key: 'doall',
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store
    
  })
);


app.use((req, res, next)=>{ 
 //middleware en espera
 next()
})
app.use((req, res, next)=>{ 
  //middleware en espera
 
  next()
})


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// VAriables globales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || req.flash("user");
  res.locals.mode = req.mode || req.flash("mode");
  next();
});

//Archivos estaticos
app.use(express.static(__dirname + '/public'));

app.use(indexRoutes)
app.use(projectsRoutes)
app.use(tasksRoutes)
app.use(usersRoutes)
app.use(redsocial)
app.use(contactos)
app.use(listas)

app.use((req, res) => {
  res.render("404");
});


export default app;