import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'


export const Contacto=sequelize.define('contactos',{
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
    },
    nombre:{
        type:DataTypes.STRING,
    },
    apellido:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING,
    },
    telefono:{
        type:DataTypes.STRING,
    },
    nota:{
        type:DataTypes.STRING,
    },
    foto:{
        type:DataTypes.STRING,
    },
    config:{
        type:DataTypes.JSONB,
    },
},{
    timestamps:false
});

