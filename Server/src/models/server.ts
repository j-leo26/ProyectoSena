import express from 'express';
import routesTasks from '../routes/Tasks';
import routesUser from '../routes/User';
import { tasks } from './Tasks';
import { User } from './User';

export class Server{

    private app: express.Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middleware();
        this.routes();
        this.dbConnect();
    }
    listen(){
        this.app.listen(this.port, () =>{
            console.log('Esta aplicacion esta corriendo en el puerto: ' + this.port )
        })
    }
    routes(){
        this.app.use('/api/Tasks', routesTasks);
        this.app.use('/api/Users', routesUser);
    }
    middleware(){
        this.app.use(express.json());
    }
    async dbConnect(){
        try{
            await tasks.sync();
            await User.sync();
        }catch (error){
            console.error('unable to connect to the database:', error);
        }
    }
}
export default Server;