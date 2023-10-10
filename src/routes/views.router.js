import { Router } from "express";
const router = Router();
import { login, register, errorLogin, errorRegister, profile,logout,resetpass,newpass } from "../controllers/views.controllers.js";
import { hasLoggin } from "../middlewares/hasLogin.js";


router.get('/',hasLoggin, login);
router.get('/login',hasLoggin, login);
router.get('/register',hasLoggin, register);
router.get('/logout', logout);
router.get('/error-login', errorLogin);
router.get('/error-register', errorRegister);
router.get('/profile', profile);
router.get('/resetpass', resetpass)
router.get('/new-pass', newpass)


export default router;