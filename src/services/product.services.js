import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const productDao = new ProductDaoMongoDB();
import fs from 'fs';
import {__dirname} from '../utils.js';


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



export const getAllProducts = async (page, limit) => {
    try {
        const response = await productDao.getAll(page, limit);
        if (!response) return false;
        else return response;
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
