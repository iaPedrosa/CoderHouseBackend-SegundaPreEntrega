import mongoose from 'mongoose';
import 'dotenv/config';
import { logger } from '../../../utils.js';


export const connectionString = process.env.MONGODBURL;

export const initMongoDB = async() => {
  try {
    await mongoose.connect(connectionString);
    logger.info('Conectado a la base de datos de MongoDB')
  } catch (error) {
    console.log(error);
  }
}


