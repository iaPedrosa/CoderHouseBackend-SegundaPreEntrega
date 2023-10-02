import { Cart } from './models/carts.model.js';
import { ProductModel } from './models/product.model.js';
import {logger} from '../../../utils.js'

export default class CartDaoMySQL {
  async deleteAll() {
    try {
      const response = await Cart.destroy({ where: {} });
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async createCart(email) {
    try {
      const cart = await Cart.create({ email });
      return cart;
    } catch (error) {
      logger.error(error);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const product = await ProductModel.findByPk(productId);
      const cart = await this.getCartById(cartId);

      if (!product || !cart) {
        throw new Error('El producto o el carrito no existen');
      }

      const existingProduct = cart.products.find(
        (item) => item.productId === productId
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.addProduct(product, { through: { quantity: 1 } });
      }

      return cart;
    } catch (e) {
      console.log(e);
    }
  }

  async getCarts() {
    try {
      const response = await Cart.findAll({ include: Product });
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async getCartById(idCart) {
    try {
      const response = await Cart.findByPk(idCart, { include: Product });
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteCart(idCart) {
    try {
      const response = await Cart.destroy({ where: { id: idCart } });
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteProductFromCart(idCart, idProduct) {
    try {
      const cart = await this.getCartById(idCart);

      if (!cart) {
        throw new Error('El carrito no existe');
      }

      const existingProduct = cart.products.find(
        (item) => item.productId === idProduct
      );

      if (!existingProduct) {
        throw new Error('El producto no existe en el carrito');
      }

      cart.removeProduct(existingProduct);

      return { message: 'Producto eliminado.', cart };
    } catch (e) {
      console.log(e);
    }
  }

  async updateCart(idCart, cart) {
    try {
      const response = await Cart.update(cart, { where: { id: idCart } });
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async updateProductCart(idCart, idProduct, quantity) {
    try {
      const cart = await this.getCartById(idCart);

      if (!cart) {
        throw new Error('El carrito no existe');
      }

      const existingProduct = cart.products.find(
        (item) => item.productId === idProduct
      );

      if (!existingProduct) {
        throw new Error('El producto no existe en el carrito');
      }

      if (quantity === 0) {
        cart.removeProduct(existingProduct);
        return { message: 'Producto eliminado.', cart };
      }

      const product = await ProductModel.findByPk(idProduct);

      if (!product) {
        throw new Error('El producto no existe');
      }

      if (product.stock < quantity) {
        throw new Error('No hay stock suficiente');
      }

      existingProduct.quantity = quantity;
      await cart.save();

      return { message: 'Producto actualizado.', cart };
    } catch (e) {
      console.log(e);
    }
  }

  async getSumaTotal(idCart) {
    try {
      const cart = await this.getCartById(idCart);
      const sumaTotal = cart.products.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);
      return sumaTotal;
    } catch (e) {
      console.log(e);
    }
  }

  async getCartByEmail(email) {
    try {
       const cart = await Cart.findOne({ where: { email,complete:false }, include: Product });
 
      return cart;
    } catch (error) {
      logger.error(error);
    }
  }
}
