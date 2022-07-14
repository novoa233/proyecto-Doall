import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'
import{Lista} from './Listas.js'



export const Project=sequelize.define('projects', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    descripcion:{
        type: DataTypes.STRING,
    },
    prioridad: {
        type: DataTypes.STRING,
    },
    fecha_inicio:{
        type:DataTypes.DATEONLY
    },
    estado:{
        type: DataTypes.STRING
    }
},{
    timestamps: true
});


Project.hasMany(Lista, {
    foreignKey: 'projectId',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});

Lista.belongsTo(Project, {
    foreignKey: 'projectId',
    targetId: 'id'
});
