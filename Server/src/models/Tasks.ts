import { DataTypes } from "sequelize";
import sequelize from "../db/Connection";

export const tasks = sequelize.define('task',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    },
    startDate:{
        type: DataTypes.DATE
    },
    endDate:{
        type: DataTypes.DATE
    },
    Estado:{
        type: DataTypes.STRING
    }
})