import { Router } from 'express';
import * as controller from '../controllers/carts.controllers.js';

const router = Router();

router.post('/', controller.createCart);     
router.post('/:idCart/products/:idProduct', controller.addProductToCart);
router.get('/', controller.getCarts);
router.get('/:idCart', controller.getCart);
router.delete('/:idCart/products/:idProduct', controller.deleteProductFromCart);

export default router;

