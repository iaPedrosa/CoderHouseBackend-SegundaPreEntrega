import './db/database.js';
import { __dirname,mongoStoreOptions } from './utils.js';
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
import './passport/google-strategy.js'
import router from './routes/index.js';
import 'dotenv/config';


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

app.use('/', router);

const port = process.env.PORT || 3000;

const httpServer = app.listen(port, () => {
  console.log(
    `🚀 Server listening on port ${port} ! - http://localhost:${port}/`,
  );
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

