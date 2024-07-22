import {Router} from 'express';
import { getTask } from '../controllers/Tasks';
import validateToken from './Validate-token';

const router = Router();

router.get('/', validateToken, getTask)

export default router;