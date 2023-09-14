import { DataTypes, Model } from 'sequelize';
import { db } from '../connection.js';
import { ProductModel } from './product.model.js'; // Asegúrate de importar correctamente el modelo de Product

class CartItem extends Model {}

CartItem.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'cart_item',
  }
);

class Cart extends Model {}

Cart.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'cart',
  }
);

Cart.belongsTo(ProductModel, {
  foreignKey: 'productId', 
  as: 'product', 
});

ProductModel.hasMany(Cart, {
  foreignKey: 'productId', // El nombre de la clave foránea en la tabla de Cart
  as: 'carts', // Nombre del alias para la relación inversa
});

export { Cart, CartItem };
