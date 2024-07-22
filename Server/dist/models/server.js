"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const Tasks_1 = __importDefault(require("../routes/Tasks"));
const User_1 = __importDefault(require("../routes/User"));
const Tasks_2 = require("./Tasks");
const User_2 = require("./User");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middleware();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Esta aplicacion esta corriendo en el puerto: ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/Tasks', Tasks_1.default);
        this.app.use('/api/Users', User_1.default);
    }
    middleware() {
        this.app.use(express_1.default.json());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Tasks_2.tasks.sync();
                yield User_2.User.sync();
            }
            catch (error) {
                console.error('unable to connect to the database:', error);
            }
        });
    }
}
exports.Server = Server;
exports.default = Server;
