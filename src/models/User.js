import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'
import{Project} from './Project.js'
import {Contacto} from './Contacto.js'

export const User=sequelize.define('user',{
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    apellido:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    foto:{
        type: DataTypes.STRING,
    },
    config: DataTypes.JSONB
},{
    timestamps:false
});

User.hasMany(Project, {
    foreignKey: 'userId',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});

Project.belongsTo(User, {
    foreignKey: 'userId',
    targetId: 'id'
})

User.hasMany(Contacto, {
    foreignKey: 'userId',
    sourceKey: 'id'
});

Contacto.belongsTo(User, {
    foreignKey: 'userId',
    targetId: 'id'
});