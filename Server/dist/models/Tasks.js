"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = void 0;
const sequelize_1 = require("sequelize");
const Connection_1 = __importDefault(require("../db/Connection"));
exports.tasks = Connection_1.default.define('task', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE
    },
    Estado: {
        type: sequelize_1.DataTypes.STRING
    }
});
