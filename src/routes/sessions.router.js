import { Router } from 'express';
import * as controller from '../controllers/sessions.controllers.js';
import {APIloginJWT} from "../controllers/users.controllers.js";


const router = Router();

router.get('/current', controller.current);
router.post('/login', APIloginJWT);


export default router;