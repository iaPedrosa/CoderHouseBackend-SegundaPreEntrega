//index js para las routes
import productsRouter from './products.router.js';
import productsRouterAPI from './productsAPI.router.js';
import cartsRouter from './carts.router.js';
import ApiDocumentationRouter from './documentation.router.js';
import realtimeproductsRouter from './realtimeproducts.router.js';
import userRouter from './user.router.js';
import viewsRouter from './views.router.js';
import cartsPageRouter from './cartPage.router.js';



import { Router } from "express";
const router = Router();

router.use('/documentation', ApiDocumentationRouter);
router.use('/cart', cartsPageRouter);
router.use('/realtimeproducts', realtimeproductsRouter);
router.use('/',viewsRouter)
router.use('/users',userRouter)
router.use('/products',productsRouter)

router.use('/api/products', productsRouterAPI);
router.use('/api/carts', cartsRouter);

export default router;
