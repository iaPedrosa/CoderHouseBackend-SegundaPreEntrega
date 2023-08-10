import { Router } from "express";
import { registerResponse, loginResponse ,logoutUser,githubResponse,googleResponse } from "../controllers/users.controllers.js";
import passport from 'passport';
import { isAuth } from '../middlewares/isAuth.js';


const router = Router();

router.post('/register',passport.authenticate('register',{ failureRedirect: '/register?error=e' }), registerResponse);
router.post('/login', passport.authenticate('login', { failureRedirect: '/login?error=e' }), loginResponse);
router.post ('/logout', logoutUser);
router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/profile-github', passport.authenticate('github', { scope: ['user:email'] }), githubResponse);

router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', { assignProperty: 'user'}), googleResponse)

export default router;

