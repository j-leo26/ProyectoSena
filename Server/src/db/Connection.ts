import { Sequelize } from "sequelize";


const sequelize = new Sequelize('userTasks', 'root', 'Leo2605_', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;