import { ProductModel } from "./models/product.model.js";


export default class ProductDaoMySQL {
    async getAll(page = 1, limit = 10, sort = 'asc', filter = null, filterValue = null, status = null) {
        try {
            let sortOrder = 'ASC';

            if (sort === 'desc') {
                sortOrder = 'DESC';
            }

            let whereOptions = {};

            if (filter && filterValue) {
                if (filter === 'code') {
                    whereOptions = { code: { [Sequelize.Op.like]: `%${filterValue}%` } };
                } else {
                    if (!isNaN(filterValue)) {
                        whereOptions[filter] = Number(filterValue);
                    } else {
                        whereOptions[filter] = { [Sequelize.Op.like]: `%${filterValue}%` };
                    }
                }
            }

            if (status !== null) {
                whereOptions.status = status;
            }

            const response = await ProductModel.paginate();


            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllComplete() {
        try {
            const response = await ProductModel.findAll();
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const response = await ProductModel.findByPk(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async bulkCreate(obj) {
        try {
            const response = await ProductModel.bulkCreate(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try {
            const response = await ProductModel.update(obj, { where: { id: id } });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const response = await ProductModel.destroy({ where: { id: id } });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            const response = await ProductModel.destroy({ where: {} });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getCategories() {
        try {
            const response = await ProductModel.distinct('category');
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
