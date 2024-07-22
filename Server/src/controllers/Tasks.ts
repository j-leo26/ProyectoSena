import { Request, Response } from 'express';
import { tasks } from '../models/Tasks';

export const getTask = async (req: Request, res: Response) => {
    const listTasks= await tasks.findAll();
    
    res.json({listTasks})
}