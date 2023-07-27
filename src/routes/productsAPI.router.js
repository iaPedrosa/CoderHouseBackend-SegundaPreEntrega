import { Router } from 'express';
import * as controller from '../controllers/products.controllers.js';

const router = Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getById);
router.post('/file', controller.createFileCtr);



export default router;