import { ProductModel } from "./models/product.model.js";
import { CartModel } from './models/carts.model.js';
import CartDaoMongoDB from "./cart.dao.js";
import e from "express";
const serviceCart = new CartDaoMongoDB();
import {logger} from '../../../utils.js';

export default class ProductDaoMongoDB {
    async getAll(page = 1, limit = 10,sort='asc',filter=null,filterValue=null,status=null){
        try {
            let sortOrder;
            
            if ( sort === 'desc' ) {
                sortOrder = -1;
            } else {
                sortOrder = 1;
            }
            let whereOptions = {};

            if (filter && filterValue) {
                if (filter==='code') {
                    // Si la busqueda es de codigo, tratamos la búsqueda con expresión regular
                    whereOptions = { [filter]: { $regex: filterValue, $options: 'i' } };
                } else{
                if (!isNaN(filterValue)) {
                    // Si el valor del filtro es un número, tratamos la búsqueda numérica
                    whereOptions = { [filter]: Number(filterValue) };
                } else {
                    // Si el valor del filtro no es un número, tratamos la búsqueda con expresión regular
                    whereOptions = { [filter]: { $regex: filterValue, $options: 'i' } };
                }
            }
            }
            if (status !== null) {
                whereOptions.status = status;
            }

            

            const response = await ProductModel.paginate(whereOptions, { limit, page, sort: { price: sortOrder } });
            
            return response;
        } catch (error) {
            logger.error(error);
        }
    }

    async getAllComplete(){
        try {
            const response = await ProductModel.find();
            return response;
        } catch (error) {
            logger.error(error);
        }
    }
    

    async getById(id){
        try {
            const response = await ProductModel.findById(id);
            return response;
        } catch (error) {
            logger.error(error);
        }
    }

    async create(obj){
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            logger.error(error);
        }
    }

    async update(id, obj){
        try {
            const response = await ProductModel.findByIdAndUpdate(id, obj, { new: true });
            return response;
        } catch (error) {
            logger.error(error);
        }
    }
    
    async delete(id){
        try {
            
           const response = await ProductModel.findByIdAndDelete(id);
           return response;
        } catch (error) {
            logger.error(error);
        }
    }

    async deleteAll(){
        try {
            const response = await ProductModel.deleteMany();
            return response;
        } catch (error) {
            logger.error(error);
        }
    }


    async getCategories(){
        try {
            const response = await ProductModel.distinct('category');
            return response;
        } catch (error) {
            logger.error(error);
        }
    }

    async revisarStock(idCarrito) {
        try {
           
           let eliminados = false;

            const cart = await CartModel.findById(idCarrito).populate('products.product');
            

            const promises = cart.products.map(async (prod) => {
                const product = await ProductModel.findById(prod.product._id);
                if (product.stock < prod.quantity) {

                    if (prod.quantity >0) {
                        prod.quantity = product.stock;
                        await cart.save();                    
                        await product.save();
                        eliminados = true;
                    }else{

                    
                    eliminados = true;
                    await serviceCart.deleteProductFromCart(idCarrito, product._id);
                    }


            
                }
            });

            await Promise.all(promises);

            return eliminados;
            
              
           

        } catch (error) {
            throw error
        }
    }



    

    async restarStock(idCarrito){
        try {
            
            const cart = await CartModel.findById(idCarrito).populate('products.product');
            console.log(cart.products);
            cart.products.forEach(async (prod) => {
                const product = await ProductModel.findById(prod.product._id);
                product.stock -= prod.quantity;
                await product.save();
            });

            
        } catch (error) {
            logger.error(error);
            
        }
    }
}