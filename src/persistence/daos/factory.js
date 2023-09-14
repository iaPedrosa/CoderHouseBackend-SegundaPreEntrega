/* ------------------------------------ - ----------------------------------- */
import ProductDaoMongoDB from "./mongodb/product.dao.js";
import UserDaoMongoDB from "./mongodb/user.dao.js";
import CartDaoMongoDB from "./mongodb/cart.dao.js";
import TicketDaoMongoDb from "./mongodb/ticket.dao.js";

import { initMongoDB } from "./mongodb/connection.js";
/* ------------------------------------ - ----------------------------------- */
import ProductDaoMySQL from "./mysql/product.dao.js";
import UserDaoMySQL from "./mysql/user.dao.js";
import CartDaoMySQL from "./mysql/cart.dao.js";
import { initMySqlDB } from "./mysql/connection.js";



let userDao;
let prodDao;
let cartDao;
let ticketDao;

let persistence;

if (process.argv[2] !== undefined && process.argv[2] !== null) {
  persistence = process.argv[2];
} else {
  persistence = process.env.PERSISTENCE;
}

switch (persistence) {
  case "mongo":
    await initMongoDB();
    userDao = new UserDaoMongoDB();
    prodDao = new ProductDaoMongoDB();
    cartDao = new CartDaoMongoDB();
    ticketDao = new TicketDaoMongoDb();
    console.log(persistence);
    break;
  case "mysql":
    await initMySqlDB();
    userDao = new UserDaoMySQL();
    prodDao = new ProductDaoMySQL();
    cartDao = new CartDaoMySQL();
    console.log(persistence);
    break;
  default:
    await initMongoDB();
    userDao = new UserDaoMongoDB();
    prodDao = new ProductDaoMongoDB();
    cartDao = new CartDaoMongoDB();
    ticketDao = new TicketDaoMongoDb();
    console.log(persistence);
    break;
}

export default { prodDao, userDao,cartDao,ticketDao };
