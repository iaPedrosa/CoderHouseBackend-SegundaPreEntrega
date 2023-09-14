import { db } from '../connection.js';
import { DataTypes } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';

export const ProductModel = db.define('products', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnails: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelizePaginate.paginate(ProductModel);