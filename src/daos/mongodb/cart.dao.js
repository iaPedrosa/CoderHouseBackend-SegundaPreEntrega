import { CartModel } from './models/carts.model.js';

export default class CartDaoMongoDB {
  

  async createCart(obj) {
    try {
      const response = await CartModel.create(obj);
      return response;
     
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(idCart, idProduct) {
    try {
      const cart = await this.getCartById(idCart);
      const product = await ProductModel.findById(idProduct);

      if (!product) {
        throw new Error('El producto no existe.');
      }

      const existingProduct = cart.products.find(p => p.product.equals(product._id));

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        const newProduct = { product: product._id, quantity: 1 };
        cart.products.push(newProduct);
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async saveCart(cart) {
    try {
      const savedCart = await cart.save();
      return savedCart;
    } catch (error) {
      throw error;
    }
  }


  
  async getCarts() {
    try {
      const response = await CartModel.find({});
      return response;
      }
     catch (error) {
      console.log(error);
    }
  }



  async getCartById(idCart) {
    try {
      const response = await CartModel.findById(idCart);
      return response;

    } catch (error) {
      console.log(error);
    }
  }
}
