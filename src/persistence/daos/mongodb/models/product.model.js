import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
    {
      title: { type: String, required: true, index: true },
      description: { type: String, required: true },
      code: { 
        type: String, 
        required: true, 
        unique: true, 
        index: true,
        default: function() {
          // Eliminar espacios y generar un valor predeterminado para 'code'
          const randomNumber = Math.floor(100 + Math.random() * 900); // Genera un número aleatorio de 100 a 999
          const titleWithoutSpaces = this.title.replace(/\s/g, ''); // Elimina espacios del título
          return `${titleWithoutSpaces}${randomNumber}`;
        }
      },
      stock: { type: Number, required: true },
      price: { type: Number, required: true },
      status: { type: String, required: false, default: 'true' },
      category: { type: String, required: true },
      thumbnails: { type: String, required: false },
      owner: { type: String, required: false,default:'admin' },
      imagen: { type: String, required: false,default: '/products/sinimagen.jpeg' },
    }
  );


  productSchema.plugin( mongoosePaginate );

export const ProductModel = mongoose.model('products', productSchema);

