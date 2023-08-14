import { Router } from 'express';
import * as controller from '../controllers/carts.controllers.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = Router();

router.get('/:idCart',checkAuth, controller.getCartPage);
router.delete('/:idCart/products/:idProduct',checkAuth, controller.deleteProductFromCart);

export default router;

