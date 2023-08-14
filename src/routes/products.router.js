import { Router } from 'express';
import * as controller from '../controllers/products.controllers.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = Router();

router.get('/',checkAuth, controller.getAllPage);




export default router;