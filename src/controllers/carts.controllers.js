import * as serviceCart from "../services/cart.services.js";
import * as serviceProd from "../services/product.services.js";

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
        const {idCart, idProduct} = req.params;
        const cartID = await serviceCart.getCart(idCart);
        const productID = await serviceProd.getById(idProduct);
        if (!cartID) {
            res.status(404).json({ error: 'El carrito no existe.' });
        }
        if (!productID) {
            res.status(404).json({ error: 'El producto no existe.' });
        }

        if (productID.status === 'false' || productID.stock === 0) {
            res.status(404).json({ error: 'El producto no se puede agregar al carrito. Esta deshabilitado o no hay stock' });
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

export const deleteCart = async (req, res, next) => {
    try {
        const {idCart} = req.params;
        const cartID = await serviceCart.getCart(idCart);
        if (!cartID) {
            res.status(404).json({ error: 'El carrito no existe.' });
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
            res.status(404).json({ error: 'El carrito no existe.' });
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
            res.status(404).json({ error: 'El carrito no existe.' });
        }
        if (!productID) {
            res.status(404).json({ error: 'El producto no existe.' });
        }

        const quantity = req.body;
        await serviceCart.updateProductCart(idCart, idProduct, quantity);
        const newCart = await serviceCart.getCart(idCart);
        res.status(200).json(newCart);

    } catch (error) {
        next(error);
    }
    }
    