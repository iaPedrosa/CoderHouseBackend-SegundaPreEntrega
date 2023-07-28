import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
const cartDao = new CartDaoMongoDB();
import fs from 'fs';
import {__dirname} from '../utils.js';

export const createCart = async () => {
    const cart = await cartDao.createCart();
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