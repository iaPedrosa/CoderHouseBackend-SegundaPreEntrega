import { CartModel } from './models/carts.model.js';
import { ProductModel } from './models/product.model.js';

export default class CartDaoMongoDB {
  

  async createCart(obj) {
    try {
      const response = await CartModel.create(obj);
      return response;
     
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cartId, productId) {
    try {
        const product = await ProductModel.findById(productId);
        const cart = await this.getCartById(cartId);
        const existingProduct = cart.products.find(
        (item) => item.product._id.toString() === product._id.toString()
        );
        if (existingProduct) {
            // Si el producto ya está en el carrito, se incrementa la cantidad
            existingProduct.quantity += 1;
        } else {
            // Si el producto no está en el carrito, se agrega con una cantidad de 1
            cart.products.push({ product, quantity: 1 });
        }
        await cart.save();
    } catch (e) {
        throw new Error(e.message);
    }
};

  
  async getCarts() {
    try {
      const response = await CartModel.find({}).populate('products.product');
      return response;
      }
     catch (error) {
      console.log(error);
    }
  }



  async getCartById(idCart) {
    try {
      const response = await CartModel.findById(idCart).populate('products.product');
      

      return response;

    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart(idCart) {
    try {
      const response = await CartModel.findByIdAndDelete(idCart);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductFromCart(idCart, idProduct) {
    try {
      const cart = await this.getCartById(idCart);

      if (!cart) {
        throw new Error('El carrito no existe');
      }

      cart.products = cart.products.filter(
        (item) => item.product._id.toString() !== idProduct.toString()
      );
      await cart.save();

      return { message: 'Producto eliminado.', cart };

    } catch (e) {
      throw new Error(e.message);
    }
  }



}


