import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'
import{Task} from './Task.js'

export const Lista=sequelize.define('listas', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    config:{
        type: DataTypes.JSONB
    }
},{
    timestamps: true
});

Lista.hasMany(Task, {
    foreignKey: 'id_lista',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});

Task.belongsTo(Lista, {
    foreignKey: 'id_lista',
    targetId: 'id'
})