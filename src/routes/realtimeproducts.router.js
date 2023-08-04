import { Router } from 'express';
import * as controller from '../controllers/realtimeproducts.controllers.js';
import { validateLogin } from '../middlewares/validateLogin.js';

const router = Router();

router.get('/',validateLogin, controller.getAllPage);

export default router;