import * as service from "../services/product.services.js";

import { socketServer } from '../server.js';

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
    res.render('realtimeproducts');
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al obtener los productos.', detailError: error.message });
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
      res.status(404).json({ error: 'Producto no encontrado.' });
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
    if (!updatedProduct) res.status(400).json({ error:"Error al actualizar" });
    else res.json(updatedProduct);


  } catch (error) {
      next(error);
    
    
  }
}

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await service.remove(id);
    if (!deletedProduct) res.status(400).json({ error:"Error al eliminar" });
    else res.json({ message: "Producto eliminado", producto: deletedProduct });
    
  } catch (error) {
    next(error);
    
  }

}



