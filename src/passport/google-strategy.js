
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import factory from '../persistence/daos/factory.js';
const { userDao } = factory;

const strategyOptions = {
    clientID: '26620284146-tmo21284ki4tkp521j2t6nemntsnluv9.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'https://iapedrosashop.adaptable.app/users/oauth2/redirect/accounts.google.com',
    scope: [ 'profile', 'email' ],
    state: true
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  
    
    const email = profile._json.email;
    const user = await userDao.getByEmail( email );
    if ( user ){ 
        await userDao.updateTimeLoggin(user);
        
        return done( null, user );
    }
    const newUser = await userDao.register({
        first_name: profile._json.given_name,
        last_name: profile._json.family_name,
        email,
        password: '',
        isGoogle: true
    });
    return done(null, newUser);
};

passport.use('google', new GoogleStrategy(strategyOptions, registerOrLogin));

passport.serializeUser((user, done)=>{
    done(null, user);
});

passport.deserializeUser((id, done)=>{
    done(null, id);
});