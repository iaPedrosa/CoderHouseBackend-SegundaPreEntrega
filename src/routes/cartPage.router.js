import { Router } from 'express';
import * as controller from '../controllers/carts.controllers.js';

const router = Router();

router.get('/:idCart', controller.getCartPage);
router.delete('/:idCart/products/:idProduct', controller.deleteProductFromCart);

export default router;

