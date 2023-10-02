import { dirname } from "path";
import { fileURLToPath } from "url";
import { hashSync,compareSync, genSaltSync } from "bcrypt";
import MongoStore from 'connect-mongo';
import { faker } from "@faker-js/faker";
import winston from "winston";
import 'winston-mongodb';
import { format } from "winston";
import 'dotenv/config';

const { combine, printf, prettyPrint, timestamp, colorize } = format;

import 'dotenv/config';

export const mongoStoreOptions = {
  store: MongoStore.create({
      mongoUrl: process.env.MONGODBURL,
      crypto: {
          secret: process.env.SECRET_KEY_JWT
      }
  }),
  secret: process.env.SECRET_KEY_JWT,
  resave: false,
  saveUninitialized: false,
  cookie: {
    //Duracion de la cookie en milisegundos (20 minutos)
    maxAge: 1000 * 60 * 20
      
  }
};




export const __dirname = dirname(fileURLToPath(import.meta.url));



/**
 * Método que recibe password sin hashear y retorna password hasheada
 * @param {*} password string
 * @returns password hasheada -> string
 * @example 
 * createHash('1234')
 */
export const createHash = password => hashSync(password, genSaltSync(10));

/**
 * Método que compara password hasheada con password de login
 * @param {*} user 
 * @param {*} password string
 * @returns boolean
 */
export const isValidPassword = (password, user) => compareSync(password, user.password);

export const generateProductFake = () => {
  return{
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.string.uuid(),
    stock: faker.number.int({ min: 1, max: 100 }),
    price: faker.number.int({ min: 10, max: 500 }),
    status: faker.datatype.boolean(),
    category: faker.commerce.department(),
  };
}

let logConfig;

if(process.env.NODE_ENV === 'development'){


   logConfig = {
    transports: [
      new winston.transports.File({
        filename: './errors.log',
        level: 'error'
      }),
      new winston.transports.MongoDB({
        options: { useUnifiedTopology: true },
        db: process.env.MONGODBURL, 
        collection: 'logs',
        tryReconnect: true,
        level: 'error'
      }),
      new winston.transports.Console({
        level: 'silly',
        format: combine(
          timestamp({ format: 'MM-DD-YYYY HH:mm:ss' }),
          colorize(),
          printf((info) => `${info.level} | ${info.timestamp} | ${info.message}`)
        )
      })
    ]
  };



} else {
   logConfig = {
    transports: [
      new winston.transports.File({
        filename: './errors.log',
        level: 'error'
      }),
      new winston.transports.MongoDB({
        options: { useUnifiedTopology: true },
        db: process.env.MONGODBURL, 
        collection: 'logs',
        tryReconnect: true,
        level: 'error'
      }),
      new winston.transports.Console({
        level: 'debug',
        format: combine(
          timestamp({ format: 'MM-DD-YYYY HH:mm:ss' }),
          colorize(),
          printf((info) => `${info.level} | ${info.timestamp} | ${info.message}`)
        )
      })
    ]
  };


}

export const logger = winston.createLogger(logConfig);