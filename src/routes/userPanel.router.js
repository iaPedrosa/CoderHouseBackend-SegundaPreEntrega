import { Router } from 'express';
import * as controller from '../controllers/userpanel.controllers.js';


const router = Router();

router.get('/', controller.usersPanel);


export default router;