import { Router } from 'express';
import * as controller from '../controllers/admin.controllers.js';
import { isAdmin } from "../middlewares/isAdmin.js";


const router = Router();

router.get('/users',isAdmin, controller.usersPanel);
router.post('/users/cambiarrol',isAdmin, controller.cambiarRol);    


export default router;