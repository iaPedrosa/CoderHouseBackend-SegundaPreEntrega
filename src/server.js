import './db/database.js';
import { __dirname } from './utils.js';
import express from 'express';
import { Server } from 'socket.io';
import morgan from 'morgan';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import productsRouterAPI from './routes/productsAPI.router.js';
import cartsRouter from './routes/carts.router.js';
import { errorHandler } from './middlewares/errorHandler.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(errorHandler);
app.use(morgan('dev'));
app.set('views', __dirname + '/views');
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

app.use('/',productsRouter)
app.use('/api/products', productsRouterAPI);
app.use('/api/carts', cartsRouter);

const httpServer = app.listen(8080, () => {
    console.log('🚀 Server listening on port 8080!');
  });


export const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado');
  socketServer.emit('messages', await chatServices.getAll());

  getProductData(socket);
 


  socket.on('getProducts', () => {
    getProductData(socket);
  });



});

async function getProductData(socket) {
  
  const products = await services.getAll();
  socket.emit('productCreated', products);
}
