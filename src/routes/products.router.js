import { Router } from 'express';
import * as controller from '../controllers/products.controllers.js';

const router = Router();

router.get('/', controller.getAllPage);

router.get('/:id', controller.getByIdPage);
router.post('/file', controller.createFileCtr);



export default router;