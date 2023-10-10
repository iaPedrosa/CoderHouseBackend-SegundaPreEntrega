import { Router } from "express";
import { registerResponse, loginResponse ,logoutUser,registerJWT,loginJWT,premium,resetPass,updatePass} from "../controllers/users.controllers.js";
import passport from 'passport';
import { isAdmin } from "../middlewares/isAdmin.js";



const router = Router();

router.post('/register', registerJWT)
router.post ('/resetpass', resetPass)
router.post('/newpass/:tok',updatePass)

router.post('/login', loginJWT);
router.post ('/logout', logoutUser);
router.post('/premium/:id',isAdmin, premium);


router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/profile-github', passport.authenticate('github', { scope: ['user:email'] }), registerResponse);

router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', { assignProperty: 'user'}), registerResponse)

export default router;

