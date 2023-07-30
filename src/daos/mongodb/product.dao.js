import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
    async getAll(page = 1, limit = 10,sort='asc',filter=null,filterValue=null){
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
            const response = await ProductModel.paginate(whereOptions, { page, limit, sort: { price: sortOrder } });
            
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllComplete(){
        try {
            const response = await ProductModel.find();
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    

    async getById(id){
        try {
            const response = await ProductModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj){
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj){
        try {
            const response = await ProductModel.findByIdAndUpdate(id, obj, { new: true });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    
    async delete(id){
        try {
            
           const response = await ProductModel.findByIdAndDelete(id);
           return response;
        } catch (error) {
            console.log(error);
        }
    }
}