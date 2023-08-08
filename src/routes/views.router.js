import { Router } from "express";
const router = Router();
import { login, register, errorLogin, errorRegister, profile,logout } from "../controllers/views.controllers.js";


router.get('/', login);
router.get('/login', login);
router.get('/register', register);
router.get('/logout', logout);
router.get('/error-login', errorLogin);
router.get('/error-register', errorRegister);
router.get('/profile', profile);

export default router;