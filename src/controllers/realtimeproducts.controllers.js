import * as service from "../services/product.services.js";

import { socketServer } from '../server.js';
import factory from '../persistence/daos/factory.js';
const {userDao} = factory;
import { HttpResponse } from '../middlewares/http.response.js'
const httpResponse = new HttpResponse();


export const createFileCtr = async (req, res, next) => {
    try {
      const newProducts = await service.createFileUser();
      if (!newProducts) throw new Error("Error de validacion!");
      else res.json(newProducts);
    } catch (error) {
      next(error);
    }
  };

export const create = async (req, res, next) => {
  try {
    const {
      title,
      description,
      code,
      price,
      stock,
      status,
      category,
      thumbnails,
    } = req.body;
    const product = {
      title,
      description,
      code,
      price,
      stock,
      status,
      category,
      thumbnails,
    };


    const newProduct = await service.create(product);
 
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
};




export const getAllPage = async (req, res, next) =>{
  try {

    const user = await userDao.infoUser(req.user.email);
    res.render('realtimeproducts', {
     
      user: user.first_name,
      role: user.role,

    });
 
  } catch (error) {
    httpResponse.ServerError(res, error.message);
  }
};




export const getByIdPage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await service.getById(id);
    if (!products) return res.render('index', { error: 'Producto no encontrado' });
    const plainProducts = products.toObject({ virtuals: true });
   
    res.render('index', { products: [plainProducts]});
    
  } catch (error) {
      next(error);
    
  }
}

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.getById(id);
    
 
    if (product) {
      res.json(product);
    } else {
      httpResponse.NotFound(res, 'Producto no encontrado')
    }
    
  } catch (error) {
      next(error);
    
  }
}

export const update = async (req, res, next) => {
 
  try {
    const product = req.body;
    const { id } = req.params;
    
 
    const updatedProduct = await service.update(id, product);
    if (!updatedProduct) httpResponse.ServerError(res, 'Error al actualizar')
    else res.json(updatedProduct);


  } catch (error) {
      next(error);
    
    
  }
}

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await service.remove(id);
    if (!deletedProduct) httpResponse.ServerError(res, 'Error al eliminar')
    else res.json({ message: "Producto eliminado", producto: deletedProduct });
    
  } catch (error) {
    next(error);
    
  }

}



