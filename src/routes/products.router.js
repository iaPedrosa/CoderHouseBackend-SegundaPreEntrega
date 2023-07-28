import { Router } from 'express';
import * as controller from '../controllers/products.controllers.js';

const router = Router();

router.get('/', controller.getAllPage);

router.get('/:id', controller.getByIdPage);

// router.post('/add/:idCart/:idProduct', controller.addProductToCart);



export default router;