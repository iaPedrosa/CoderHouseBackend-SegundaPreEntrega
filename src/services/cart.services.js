import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
const cartDao = new CartDaoMongoDB();
import fs from 'fs';
import {__dirname} from '../utils.js';


export const createCart = async (email) => {
    const cart = await cartDao.createCart(email);
    return cart;
}


export const getCart = async (idCart) => {
    const cart = await cartDao.getCartById(idCart);
    return cart;
}

export const getCarts = async () => {
    const carts = await cartDao.getCarts();
    return carts;
}


export const addProductToCart = async (idCart, idProduct) => {
    const cart = await cartDao.addProductToCart(idCart, idProduct);
    return cart;
}

export const deleteProductFromCart = async (idCart, idProduct) => {
    const cart = await cartDao.deleteProductFromCart(idCart, idProduct);
    return cart;
}

export const deleteCart = async (idCart) => {
    const cart = await cartDao.deleteCart(idCart);
    return cart;
}

export const updateCart = async (idCart, cart) => {
    const updatedCart = await cartDao.updateCart(idCart, cart);
    return updatedCart;
}

export const updateProductCart = async (idCart, idProduct, quantity) => {
    const updatedProduct = await cartDao.updateProductCart(idCart, idProduct, quantity);
    return updatedProduct;
}

export const getSuma = async (idCart) => {
    const sumaTotal = await cartDao.getSumaTotal(idCart);
    return sumaTotal;
}

export const getCartByEmail = async (email) => {
    const cart = await cartDao.getCartByEmail(email);
    return cart;
}

