import './db/database.js';
import { __dirname } from './utils.js';
import express from 'express';
import { Server } from 'socket.io';
import morgan from 'morgan';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import productsRouterAPI from './routes/productsAPI.router.js';
import cartsRouter from './routes/carts.router.js';
import cartsPageRouter from './routes/cartPage.router.js';
import realtimeproductsRouter from './routes/realtimeproducts.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import * as services from './services/product.services.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(errorHandler);
app.use(morgan('dev'));
app.set('views', __dirname + '/views');
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use('/cart', cartsPageRouter);
app.use('/realtimeproducts', realtimeproductsRouter);
app.use('/',productsRouter)
app.use('/products',productsRouter)

app.use('/api/products', productsRouterAPI);
app.use('/api/carts', cartsRouter);


const httpServer = app.listen(8080, () => {
    console.log('🚀 Server listening on port 8080!');
  });


export const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado');
  

  getProductData(socket);
 


  socket.on('productCreated', () => {
    getProductData(socket);
  });



});

async function getProductData(socket) {
  
  const products = await services.getAll();
  socket.emit('productCreated', products);
}

