import { Router } from 'express';
import * as controller from '../controllers/carts.controllers.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = Router();

router.get('/:idCart',checkAuth, controller.getCartPage);
router.delete('/:idCart/products/:idProduct',checkAuth, controller.deleteProductFromCart);

router.param('idCart', (req, res, next, idCart) => {
    const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
    if (idCart.match(mongoIdRegex)) {
        next();
    }
    else {
        res.render('404error');
    }
}); 

export default router;

