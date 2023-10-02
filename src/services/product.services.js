import factory from '../persistence/daos/factory.js';
const { prodDao, cartDao } = factory;
import {logger} from '../utils.js'


import fs from 'fs';
import {__dirname} from '../utils.js';
import { socketServer } from '../server.js';
import { log } from "console";
import ProductRepository from '../persistence/repository/product/product.repository.js';
const productRepository = new ProductRepository();


export const deleteAllProducts = async () => {
  try {
    const products = await prodDao.deleteAll();
    if (!products) return false;
    else return { message: '¡Productos eliminados con exito!' }
  } catch (error) {
    logger.error(error)
  }
}

export const createFileUser = async () => {
  try {
    const productsFile = JSON.parse(fs.readFileSync(__dirname+'/data/products.json', 'utf-8'));

    const newProducts = await prodDao.create(productsFile);
    //Si es mysql
    // const newProducts = await prodDao.bulkCreate(productsFile);

    if(!newProducts) return false;
    else return { message: '¡Productos creados con exito!' }
  } catch (error) {
    logger.error(error)
  }
}

export const create = async (product) => {
  try {
    const newProduct = await prodDao.create(product);
    if (!newProduct) return false;
    else {
    const products = await prodDao.getAll();
    
    socketServer.emit('productCreated', products);
    
    return newProduct;}
  } catch (error) {
    logger.error(error)
  }
}


export const getAllProducts = async (page, limit,sort,filter,filterValue,status) => {
    try {
        const response = await prodDao.getAll(page, limit,sort,filter,filterValue,status);
        if (!response) return false;
        else return response;
    } catch (error) {
        logger.error(error)
        
    }
}


export const getAll = async () => {
  try {
      const products = await prodDao.getAllComplete();
      if (!products) return false;
      else return products;
  } catch (error) {
      logger.error(error)
  }
}


export const getByIdDTO = async (id) => {
  try {
      const response = await productRepository.getByIdDTO(id);
      if (!response) return false;
      else return response;
  } catch (error) {
      logger.error(error)
  }
}

export const createProdDTO = async (obj) => {
  try {
      const response = await productRepository.createProdDTO(obj);
      if (!response) return false;
      else return response;
  } catch (error) {
      logger.error(error)
  }
}







export const getById = async (id) => {
  try {
      const product = await prodDao.getById(id);
      
      if (!product) return false;
      else return product;
  } catch (error) {
      logger.error(error)
  }
}

export const update = async (id, product) => {
  try {
      const updatedProduct = await prodDao.update(id, product);
      if (!updatedProduct) return false;
      else return updatedProduct;
  } catch (error) {
      logger.error(error)
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

      
      const deletedProduct = await prodDao.delete(id);
      if (!deletedProduct) return false;
      else return deletedProduct;
  } catch (error) {
      logger.error(error)
  }
}



export const getCategories = async () => {
  try {
      const categories = await prodDao.getCategories();
      if (!categories) return false;
      else return categories;
  } catch (error) {
      logger.error(error)
  }
}
