import * as serviceCart from "../services/cart.services.js";
import * as serviceProd from "../services/product.services.js";
import { HttpResponse } from '../middlewares/http.response.js'
const httpResponse = new HttpResponse();
import { emailUser } from '../middlewares/emailUser.js';


export const createCart = async (req, res, next) => {
    try {
        const cart = await serviceCart.createCart(req.user.email);
        res.status(201).json(cart);
    } catch (error) {
        next(error);
    }
    }

export const getCart = async (req, res, next) => {
    try {
        const {idCart} = req.params;
        const cart = await serviceCart.getCart(idCart);
        
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
    }


    export const getCartPage = async (req, res, next) => {
        try {
            const {idCart} = req.params;
            const cart = await serviceCart.getCart(idCart);
            if (!cart) {
                res.render('404error');
                
                
            }
            
            const plainCart = cart.products.map((product) => product.toObject({ virtuals: true }));
            
            
            if (plainCart.length === 0) {
                res.render('cart',{ error: 'No hay productos', IDCARRITO: idCart });

            }else{

            const suma = await serviceCart.getSuma(idCart);
            
            res.render('cart', { cart: plainCart, IDCARRITO: idCart, suma: suma});

            }

        } catch (error) {
            next(error);
        }
        }

export const getCarts = async (req, res, next) => {
    try {
        const carts = await serviceCart.getCarts();
        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
    }
    


export const addProductToCart = async (req, res, next) => {
    try {
        const email = await emailUser(req, res, next);
        const {idCart, idProduct} = req.params;
        const cartID = await serviceCart.getCart(idCart);
        const productID = await serviceProd.getById(idProduct);
        if (!cartID) {
            httpResponse.NotFound(res, 'El carrito no existe');

        }
        if (!productID) {
            httpResponse.NotFound(res, 'El producto no existe');

        }

        if (productID.status === 'false') {
            httpResponse.Unauthorized(res, 'El producto se encuentra deshabilitado');

            return;
        }

        if (productID.stock < 1) {
            httpResponse.Unauthorized(res, 'No hay stock del producto');

            return;
        }


        

        if (productID.owner === email ) {
            httpResponse.Unauthorized(res, 'No puedes agregar un producto al carrito que es tuyo');

            return;
        }



        await serviceCart.addProductToCart(idCart, idProduct);
        const newCart = await serviceCart.getCart(idCart);
        res.status(200).json(newCart);

    } catch (error) {
        next(error);
    }
    }

export const deleteProductFromCart = async (req, res, next) => {
    try {
        const {idCart, idProduct} = req.params;
        const cartID = await serviceCart.getCart(idCart);
        const productID = await serviceProd.getById(idProduct);
        if (!cartID) {
            httpResponse.NotFound(res, 'El carrito no existe');

        }
        if (!productID) {
            httpResponse.NotFound(res, 'El producto no existe');
        }

        await serviceCart.deleteProductFromCart(idCart, idProduct);
        const newCart = await serviceCart.getCart(idCart);
        res.status(200).json(newCart);

    } catch (error) {
        next(error);
    }
    }

export const deleteCart = async (req, res, next) => {
    try {
        const {idCart} = req.params;
        const cartID = await serviceCart.getCart(idCart);
        if (!cartID) {
            httpResponse.NotFound(res, 'El carrito no existe');
        }

        await serviceCart.deleteCart(idCart);
        res.status(200).json({ message: 'Carrito eliminado.' });

    } catch (error) {
        next(error);
    }
    }

export const updateCart = async (req, res, next) => {
    try {
        
        const {idCart} = req.params;
        const cartID = await serviceCart.getCart(idCart);
        if (!cartID) {
            httpResponse.NotFound(res, 'El carrito no existe');
        }

        const cart = req.body;
        await serviceCart.updateCart(idCart, cart);
        const newCart = await serviceCart.getCart(idCart);
        res.status(200).json(newCart);

    } catch (error) {
        next(error);
    }
    }


export const updateProductCart = async (req, res, next) => {
    try {
        
        const {idCart, idProduct} = req.params;
        const cartID = await serviceCart.getCart(idCart);
        const productID = await serviceProd.getById(idProduct);
        
        if (!cartID) {
            httpResponse.NotFound(res, 'El carrito no existe');
        }
        if (!productID) {
            httpResponse.NotFound(res, 'El producto no existe');
        }

        const quantity = req.body;
        await serviceCart.updateProductCart(idCart, idProduct, quantity);
        const newCart = await serviceCart.getCart(idCart);
        res.status(200).json(newCart);

    } catch (error) {
        next(error);
    }
    }
    