import { Router } from 'express';
import * as controller from '../controllers/products.controllers.js';
import { validateLogin } from '../middlewares/validateLogin.js';

const router = Router();

router.get('/',validateLogin, controller.getAllPage);




export default router;