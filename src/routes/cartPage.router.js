import { Router } from 'express';
import * as controller from '../controllers/carts.controllers.js';
import { validateLogin } from '../middlewares/validateLogin.js';

const router = Router();

router.get('/:idCart',validateLogin, controller.getCartPage);
router.delete('/:idCart/products/:idProduct',validateLogin, controller.deleteProductFromCart);

export default router;

