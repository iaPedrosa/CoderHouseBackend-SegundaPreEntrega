import { Router } from 'express';
import * as controller from '../controllers/admin.controllers.js';

const router = Router();

router.get('/users', controller.usersPanel);
router.post('/users/cambiarrol', controller.cambiarRol);    


export default router;