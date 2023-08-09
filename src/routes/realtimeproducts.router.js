import { Router } from 'express';
import * as controller from '../controllers/realtimeproducts.controllers.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();

router.get('/',isAuth, controller.getAllPage);

export default router;