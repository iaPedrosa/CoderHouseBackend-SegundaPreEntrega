import * as serviceCart from "../services/cart.services.js";
import * as serviceProd from "../services/product.services.js";

export const createCart = async (req, res, next) => {
    try {
        const cart = await serviceCart.createCart();
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
        const {idCart, idProduct} = req.params;
        const cartID = await serviceCart.getCart(idCart);
        const productID = await serviceProd.getById(idProduct);
        if (!cartID) {
            res.status(404).json({ error: 'El carrito no existe.' });
        }
        if (!productID) {
            res.status(404).json({ error: 'El producto no existe.' });
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
            res.status(404).json({ error: 'El carrito no existe.' });
        }
        if (!productID) {
            res.status(404).json({ error: 'El producto no existe.' });
        }

        await serviceCart.deleteProductFromCart(idCart, idProduct);
        const newCart = await serviceCart.getCart(idCart);
        res.status(200).json(newCart);

    } catch (error) {
        next(error);
    }
    }