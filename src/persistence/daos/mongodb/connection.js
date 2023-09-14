import mongoose from 'mongoose';
import 'dotenv/config';

export const connectionString = process.env.MONGODBURL;

export const initMongoDB = async() => {
  try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    console.log(error);
  }
}


