import factory from '../persistence/daos/factory.js';
const { ticketDao,prodDao } = factory;
import fs from 'fs';
import {__dirname} from '../utils.js';
import * as serviceCart from '../services/cart.services.js';



export const createTicket = async (id,email,suma) => {
    

    try {

    const eliminados = await prodDao.revisarStock(id);
    

        const suma = await serviceCart.getSuma(id);
        

        const ticket = await ticketDao.createTicket(id,email,suma);
        
        await prodDao.restarStock(id);
    
        return  {ticket,suma,eliminados}
        
    } catch (error) {
        
        throw error;
        
    }
    
}

