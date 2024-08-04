import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response) => {
    
    const { username, password } = req.body;

    //Con esta funcion validaremos si el usuario ya existe en la base de datos.
    const user = await User.findOne({where: {username: username}});

    if(user){
        return res.status(400).json({
            msg: `ya existe un usuario con el nombre '${username}'`
        })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        //esto nos ayuda a guardar los usuarios en la bd.
        await User.create({
            username: username,
            password: hashedPassword
        })
    
        res.json({
            msg: `usuario ${username} creado exitosamente!.`,
        })
    }catch (error){
        res.status(400).json({
            msg: 'lo siento, ocurrio un error.',
            error
        })
    }

}
export const loginUser = async (req: Request, res: Response) => {
    
    const { username, password } = req.body;

    //validamos si el usuario existe en la base de datos
    const user: any = await User.findOne({where: {username: username}});

    if(!user){
        return res.status(400).json({
            msg: 'No existe el usuario con el nombre '+username
        })
    }
    //validamos password
    const passwordValid = await bcrypt.compare(password, user.password);
    if(!passwordValid){
        return res.status(400).json({
            msg: 'password incorrecto'
        })
    }
    //generamos token
    const token = jwt.sign({
        username: username
    }, process.env.SECRET_KEY || 'pepito123', {
        expiresIn: '500000'
    });

    res.json({
        token
    });
}