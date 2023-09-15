import * as serviceCart from '../services/cart.services.js';
import UserService from '../services/user.services.js';
const userService = new UserService();
import { transporter } from "../services/email.service.js";
import * as serviceTicket from '../services/ticket.services.js';
import { userLogged } from './sessions.controllers.js';

export const createTicket = async (req, res, next) => {
  try {
    const user = await userLogged(req, res, next);
    const cart = await serviceCart.getCartByEmail(user.email);
    
    
    const {ticket,suma,eliminados}= await serviceTicket.createTicket(cart._id, cart.email);

    const cartFinal = await serviceCart.getCart(cart._id)
   
  
   
    try {
      const gmailOptions = {
        from: "ignapedrosa@gmail.com",
        to: user.email,
        subject: `Compra realizada en iaPedrosaShop!`,
        html: `<h1>Hola ${user.nombre} ${user.apellido} muchas gracias por su compra!</h1>
        
        

        <h2>Detalle de la compra:</h2>
        <ul>
        ${cartFinal.products.map((prod) => {
          return `<li>${prod.product.title} - $${prod.product.price} - Cantidad ${prod.quantity}</li> - Total $${prod.product.price * prod.quantity}`;
        })}
        </ul>
        <h3>El total a pagar es de $${suma} pesos.</h3>
        <h3>Gracias por su compra!</h3>

        `
    };
    await transporter.sendMail(gmailOptions);
    console.log('email enviado!');
    res.status(201).json(eliminados);
    } catch (error) {
      throw error;
    }

    
  } catch (error) {
    
    
    res.status(400).json({ error: error.message });

  }
};

export const createTicketPage = async (req, res, next) => {
  try {
    const user = await userLogged(req, res, next);
    const cart = await serviceCart.getCartByEmail(user.email);
    const suma = await serviceCart.getSuma(cart._id);
    
    await serviceTicket.createTicket(cart._id, cart.email, suma);
    res.redirect('/products');

  } catch (error) {}
};
