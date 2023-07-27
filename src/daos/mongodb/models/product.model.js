import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
    {
      title: { type: String, required: true, index: true },
      description: { type: String, required: true },
      code: { type: String, required: true, unique: true, index: true },
      stock: { type: Number, required: true },
      price: { type: Number, required: true },
      status: { type: String, required: false },
      category: { type: String, required: true },
      thumbnails: { type: String, required: false },
    }
  );


  productSchema.plugin( mongoosePaginate );

export const ProductModel = mongoose.model('products', productSchema);

