import { Router } from "express";
import { registerResponse, loginResponse ,logoutUser} from "../controllers/users.controllers.js";
import passport from 'passport';



const router = Router();

router.post('/register',passport.authenticate('register',{ failureRedirect: '/register?error=e' }), registerResponse);
router.post('/login', passport.authenticate('login', { failureRedirect: '/login?error=e' }), loginResponse);
router.post ('/logout', logoutUser);
router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/profile-github', passport.authenticate('github', { scope: ['user:email'] }), registerResponse);

router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', { assignProperty: 'user'}), registerResponse)

export default router;

