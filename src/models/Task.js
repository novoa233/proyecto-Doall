import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'

export const Task=sequelize.define('task',{
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
    },
    titulo:{
        type:DataTypes.STRING,
    },
    tarea:{
        type:DataTypes.STRING,
    },
    fecha_limite:{
        type:DataTypes.DATEONLY,
    },
    progreso:{
        type:DataTypes.SMALLINT,
    },
    asignacion:{
        type:DataTypes.JSONB,
    },
    config:{
        type:DataTypes.JSONB,
    },
    done:{
        type: DataTypes.BOOLEAN,
        defaultValue:false,
    }
},{
    timestamps:false
})