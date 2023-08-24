import { dirname } from "path";
import { fileURLToPath } from "url";
import { hashSync,compareSync, genSaltSync } from "bcrypt";
import MongoStore from 'connect-mongo';
import 'dotenv/config';

export const mongoStoreOptions = {
  store: MongoStore.create({
      mongoUrl: process.env.MONGO_LOCAL_URL,
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

