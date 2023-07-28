import { Router } from 'express';
import * as controller from '../controllers/products.controllers.js';
import { objValidator } from '../middlewares/productValidator.js';

const router = Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getById);
router.post('/file', controller.createFileCtr);
router.post('/',objValidator, controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);



export default router;