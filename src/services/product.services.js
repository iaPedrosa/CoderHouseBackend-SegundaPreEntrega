import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const productDao = new ProductDaoMongoDB();

import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
const cartDao = new CartDaoMongoDB();
import fs from 'fs';
import {__dirname} from '../utils.js';
import { socketServer } from '../server.js';
import { log } from "console";

export const createFileUser = async () => {
  try {
    const productsFile = JSON.parse(fs.readFileSync(__dirname+'/data/products.json', 'utf-8'));
    const newProducts = await productDao.create(productsFile);
    if(!newProducts) return false;
    else return { message: '¡Productos creados con exito!' }
  } catch (error) {
    console.log(error);
  }
}

export const create = async (product) => {
  try {
    const newProduct = await productDao.create(product);
    if (!newProduct) return false;
    else {
    const products = await this.getAll();
    
    socketServer.emit('productCreated', products);
    
    return newProduct;}
  } catch (error) {
    console.log(error);
  }
}


export const getAllProducts = async (page, limit,sort,filter,filterValue,status) => {
    try {
        const response = await productDao.getAll(page, limit,sort,filter,filterValue,status);
        if (!response) return false;
        else return response;
    } catch (error) {
        console.log(error);
        
    }
}


export const getAll = async () => {
  try {
      const products = await productDao.getAllComplete();
      if (!products) return false;
      else return products;
  } catch (error) {
      console.log(error);
  }
}




export const getById = async (id) => {
  try {
      const product = await productDao.getById(id);
      
      if (!product) return false;
      else return product;
  } catch (error) {
      console.log(error);
  }
}

export const update = async (id, product) => {
  try {
      const updatedProduct = await productDao.update(id, product);
      if (!updatedProduct) return false;
      else return updatedProduct;
  } catch (error) {
      console.log(error);
  }
}

export const remove = async (id) => {
  try {

      // Elimino el producto de todos los carritos
      const carts = await cartDao.getCarts();
      carts.forEach(cart => {
        console.log(cart);
        cart.products = cart.products.filter(
          (item) => item.product._id.toString() !== id.toString()
        );
        cart.save();
      });

      
      const deletedProduct = await productDao.delete(id);
      if (!deletedProduct) return false;
      else return deletedProduct;
  } catch (error) {
      console.log(error);
  }
}



export const getCategories = async () => {
  try {
      const categories = await productDao.getCategories();
      if (!categories) return false;
      else return categories;
  } catch (error) {
      console.log(error);
  }
}
