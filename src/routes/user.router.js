import { Router } from "express";
import { registerResponse, loginResponse ,logoutUser,registerJWT,loginJWT} from "../controllers/users.controllers.js";
import passport from 'passport';



const router = Router();

// router.post('/register',passport.authenticate('register',{ failureRedirect: '/register?error=e' }), registerResponse);
router.post('/register', registerJWT)

router.post('/login', loginJWT);
router.post ('/logout', logoutUser);
router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/profile-github', passport.authenticate('github', { scope: ['user:email'] }), registerResponse);

router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', { assignProperty: 'user'}), registerResponse)

export default router;

