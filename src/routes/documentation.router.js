import { Router } from 'express';
import * as controller from '../controllers/products.controllers.js';

const router = Router();

router.get('/', controller.api);


export default router;