import { CartModel } from './models/carts.model.js';
import { ProductModel } from './models/product.model.js';
import { TicketModel } from './models/tickets.model.js';




export default class TicketDaoMongoDB {
  

  async createTicket(id,email,suma) {
    
    try {
      console.log(suma);


      const ticket = new TicketModel({ cart: id, code: Math.random().toString(36).substr(2, 9), amount: suma, purchaser: email });
      await ticket.save();
 
      await CartModel.findByIdAndUpdate(id, { complete: true });
      await CartModel.create({ email: email});

      return ticket;
    } catch (error) {
      console.log(error);
    }
  }

  



}


