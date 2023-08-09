import { Router } from 'express';
import * as controller from '../controllers/carts.controllers.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();

router.get('/:idCart',isAuth, controller.getCartPage);
router.delete('/:idCart/products/:idProduct',isAuth, controller.deleteProductFromCart);

export default router;

