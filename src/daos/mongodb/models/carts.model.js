import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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

cartItemSchema.pre('find', function(){
  this.populate('products')
});


cartItemSchema.plugin(mongoosePaginate);

export const CartModel = mongoose.model('carts', cartSchema);
