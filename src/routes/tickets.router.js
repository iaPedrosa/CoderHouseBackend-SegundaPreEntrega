import { Router } from 'express';
import * as controller from '../controllers/tickets.controllers.js';

const router = Router();

router.post('/create', controller.createTicket);     
router.get('/', controller.createTicketPage);     





export default router;

