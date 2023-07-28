import mongoose from 'mongoose';


const cartItemSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products',
          
          
        },
        quantity: {
          type: Number,
        },
      },
    ],
  },
});


export const CartModel = mongoose.model('carts', cartItemSchema);


