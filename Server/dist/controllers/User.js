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
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //Con esta funcion validaremos si el usuario ya existe en la base de datos.
    const user = yield User_1.User.findOne({ where: { username: username } });
    if (user) {
        return res.status(400).json({
            msg: `ya existe un usuario con el nombre '${username}'`
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        //esto nos ayuda a guardar los usuarios en la bd.
        yield User_1.User.create({
            username: username,
            password: hashedPassword
        });
        res.json({
            msg: `usuario ${username} creado exitosamente!.`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'lo siento, ocurrio un error.',
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //validamos si el usuario existe en la base de datos
    const user = yield User_1.User.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({
            msg: 'No existe el usuario con el nombre ' + username
        });
    }
    //validamos password
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: 'password incorrecto'
        });
    }
    //generamos token
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, process.env.SECRET_KEY || 'pepito123', {
        expiresIn: '500000'
    });
    res.json({
        token
    });
});
exports.loginUser = loginUser;
