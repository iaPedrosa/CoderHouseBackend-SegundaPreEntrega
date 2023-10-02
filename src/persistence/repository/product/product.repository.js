import factory from "../../daos/factory.js";
const { prodDao } = factory;
import ProductResDTO from "../../dto/product/product.res.dto.js"
import ProductDTO from "../../dto/product/product.req.dto.js";
import {logger} from '../../../utils.js'

export default class ProductRepository {
    constructor(){
        this.dao = prodDao;
    }

    async getByIdDTO(id){
        try {
            const response = await this.dao.getById(id);
            return new ProductResDTO(response);
        } catch (error) {
            logger.error(error)
        }
    }

    async createProdDTO(obj) {
        try {
          const prodDTO = new ProductDTO(obj);
          const response = await this.dao.create(prodDTO);
          return response;
        } catch (error) {
          logger.error(error)
        }
    }
}