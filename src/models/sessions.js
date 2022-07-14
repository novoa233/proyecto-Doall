import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'


const Sesion= sequelize.define("Session", {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    config:DataTypes.JSONB,
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
  },{
        timestamps:false
    });

  export default Sesion