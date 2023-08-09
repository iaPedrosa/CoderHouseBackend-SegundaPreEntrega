import { Router } from "express";
import { registerResponse, loginResponse ,logoutUser } from "../controllers/users.controllers.js";
import passport from 'passport';
import { isAuth } from '../middlewares/isAuth.js';


const router = Router();

router.post('/register',passport.authenticate('register',{ failureRedirect: '/register?error=e' }), registerResponse);
router.post('/login', passport.authenticate('login', { failureRedirect: '/login?error=e' }), loginResponse);
router.post ('/logout', logoutUser);

export default router;

