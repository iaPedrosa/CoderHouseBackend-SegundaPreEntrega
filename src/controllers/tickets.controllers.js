import * as serviceCart from '../services/cart.services.js';
import UserService from '../services/user.services.js';
const userService = new UserService();
import { transporter } from "../services/email.service.js";

import * as serviceProd from '../services/product.services.js';
import * as serviceTicket from '../services/ticket.services.js';
import { sendGmail } from './email.controller.js';

import { userLogged } from './sessions.controllers.js';

export const createTicket = async (req, res, next) => {
  try {
    const user = await userLogged(req, res, next);
    const cart = await serviceCart.getCartByEmail(user.email);
    const suma = await serviceCart.getSuma(cart._id);
    const id = cart._id;
    const ticket = await serviceTicket.createTicket(cart._id, cart.email, suma);
   
    try {
      const gmailOptions = {
        from: "ignapedrosa@gmail.com",
        to: user.email,
        subject: `Compra realizada en iaPedrosaShop!`,
        html: `<h1>Hola ${user.nombre} ${user.apellido} muchas gracias por su compra!</h1>
        <h2>Detalle de la compra:</h2>
        <ul>
        ${cart.products.map((prod) => {
          return `<li>${prod.product.title} - $${prod.product.price}</li>`;
        })}
        </ul>
        <h3>El total a pagar es de $${suma} pesos.</h3>
        <h3>Gracias por su compra!</h3>

        `
    };
    const response = await transporter.sendMail(gmailOptions);
    console.log('email enviado!');
    res.json(response);
    } catch (error) {
      console.log(error);
    }

    res.status(201).json(ticket);
  } catch (error) {
    next(error);
  }
};

export const createTicketPage = async (req, res, next) => {
  try {
    const user = await userLogged(req, res, next);
    const cart = await serviceCart.getCartByEmail(user.email);
    const suma = await serviceCart.getSuma(cart._id);
    const id = cart._id;
    const ticket = await serviceTicket.createTicket(cart._id, cart.email, suma);
    res.redirect('/products');

  } catch (error) {}
};
