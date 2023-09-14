import factory from '../persistence/daos/factory.js';
const { ticketDao } = factory;
import fs from 'fs';
import {__dirname} from '../utils.js';


export const createTicket = async (id,email,suma) => {
    
   
    const ticket = await ticketDao.createTicket(id,email,suma);
    return ticket;
}

