import { Router } from 'express';
import * as controller from '../controllers/sessions.controllers.js';

const router = Router();

router.get('/current', controller.current);


export default router;