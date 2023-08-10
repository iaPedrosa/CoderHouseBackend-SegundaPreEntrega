import './db/database.js';
import { __dirname } from './utils.js';
import express from 'express';
import { Server } from 'socket.io';
import morgan from 'morgan';
import handlebars from 'express-handlebars';
import session from 'express-session';
import { connectionString } from './db/database.js';
import MongoStore from 'connect-mongo';
import productsRouter from './routes/products.router.js';
import productsRouterAPI from './routes/productsAPI.router.js';
import cartsRouter from './routes/carts.router.js';
import cartsPageRouter from './routes/cartPage.router.js';
import ApiDocumentationRouter from './routes/documentation.router.js';
import realtimeproductsRouter from './routes/realtimeproducts.router.js';
import userRouter from './routes/user.router.js';
import viewsRouter from './routes/views.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import * as services from './services/product.services.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './passport/local-strategy.js';
import './passport/github-strategy.js';
import './passport/google-strategy.js'

const mongoStoreOptions = {
  store: MongoStore.create({
      mongoUrl: connectionString,
      crypto: {
          secret: '1234'
      }
  }),
  secret: '1234',
  resave: false,
  saveUninitialized: false,
  cookie: {
    //Duracion de la cookie en milisegundos (6 horas)
    maxAge: 1000 * 60 * 60 * 6
      
  }
};



const app = express();

app.use(cookieParser());
app.use(session(mongoStoreOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(errorHandler);
app.use(morgan('dev'));
app.set('views', __dirname + '/views');
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.use('/documentation', ApiDocumentationRouter);
app.use('/cart', cartsPageRouter);
app.use('/realtimeproducts', realtimeproductsRouter);
app.use('/',viewsRouter)
app.use('/users',userRouter)
app.use('/products',productsRouter)

app.use('/api/products', productsRouterAPI);
app.use('/api/carts', cartsRouter);

const port = process.env.PORT || 3000;

const httpServer = app.listen(port, () => {
  console.log(
    `🚀 Server listening on port ${port} ! - http://localhost:${port}/`,
  );
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

