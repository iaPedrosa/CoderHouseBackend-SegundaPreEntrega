import './persistence/daos/factory.js';

import { __dirname, mongoStoreOptions} from './utils.js';

import express from 'express';
import { Server } from 'socket.io';
import morgan from 'morgan';
import handlebars from 'express-handlebars';
import session from 'express-session';
import { errorHandler } from './middlewares/errorHandler.js';
import * as services from './services/product.services.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './passport/local-strategy.js';
import './passport/github-strategy.js';
import './passport/google-strategy.js';
import router from './routes/index.js';
import 'dotenv/config';
import { logger } from './utils.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { info } from './docs/info.js';


const app = express();

const specs = swaggerJSDoc(info);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));



app

  .use(cookieParser())
  .use(session(mongoStoreOptions))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(errorHandler)
  .use(morgan('dev'))
  .set('views', __dirname + '/views')
  .engine('handlebars', handlebars.engine())
  .set('view engine', 'handlebars')
  .use(passport.initialize())
  .use(passport.session())
  .use(express.static(__dirname + '/public'))
  .use('/', router);



const port = process.env.PORT || 3000;

const httpServer = app.listen(port, () => {
  logger.info(`🚀 Server listening on port ${port} ! - http://localhost:${port}/`);
  logger.silly('Estas en entorno de desarrollo')
  
});

export const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
  getProductData(socket);

  socket.on('productCreated', () => {
    getProductData(socket);
  });
});

async function getProductData(socket) {
  const products = await services.getAll();
  socket.emit('productCreated', products);
}
