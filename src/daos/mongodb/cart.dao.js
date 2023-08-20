import { CartModel } from './models/carts.model.js';
import { ProductModel } from './models/product.model.js';

export default class CartDaoMongoDB {
  

 async deleteAll() {
    try {
      const response = await CartModel.deleteMany({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createCart(email) {
    try {
      console.log('aa',email);
      const cart = new CartModel({ email });
      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
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
            existingProduct.quantity += 1;
        } else {
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

  async updateCart(idCart, cart) {
    try {
      const response = await CartModel.updateOne({ _id: idCart }, cart);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductCart(idCart, idProduct, quantity) {
    try {
 
      const cart = await this.getCartById(idCart);
      const existingProduct = cart.products.find(
        (item) => item.product._id.toString() === idProduct.toString()
      );
      if (!existingProduct) {
        throw new Error('El producto no existe en el carrito');
      }

      if (quantity.quantity === 0) {
        cart.products = cart.products.filter(
          (item) => item.product._id.toString() !== idProduct.toString()
        );
        await cart.save();
        return { message: 'Producto eliminado.', cart };
      }

      const product = await ProductModel.findById(idProduct);
      if (product.stock < quantity.quantity) {
        throw new Error('No hay stock suficiente');
        
      }
      
      if (idProduct.stock < quantity.quantity) {
        return { message: 'No hay stock suficiente'};
        
      }

      existingProduct.quantity = quantity.quantity;
      await cart.save();
      return { message: 'Producto actualizado.', cart };
    } catch (e) {
      throw new Error(e.message);
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
      throw new Error(e.message);
    }
  }

  async getCartByEmail(email) {
    try {
      const cart = await CartModel.findOne({ email }).populate('products.product');
      return cart;
      
    } catch (error) {
      console.log(error);
      
    }



}
}


