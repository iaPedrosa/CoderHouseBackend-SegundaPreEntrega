
import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UserDao from '../daos/mongodb/user.dao.js';
const userDao = new UserDao();

// const strategyOptions = {
//     clientID: 'Iv1.3c4696932577965e',
//     clientSecret: '24d21d0a9d0c6c15880a55cc0ba3a6be18246129',
//     callbackURL: 'http://localhost:3000/users/profile-github',
// };

const strategyOptions = {
    clientID: 'Iv1.0bea34365e4f6b4e',
    clientSecret: '4acf33f8135f2d2d63a68d31f5949b2c07d1974c',
    callbackURL: '/users/profile-github',
   
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    console.log('PROFILE --> ', profile);
    console.log('email --> ', profile._json.email);
    console.log('email2 --> ', profile._json.id);
    const email = profile._json.email !== null ? profile._json.email : profile._json.login+'@github';

    const user = await userDao.getByEmail( email );
    if ( user ) return done( null, user );
    const newUser = await userDao.registerUser({
        first_name: profile._json.name.split(' ')[0],
        last_name: profile._json.name.split(' ')[1],
        email,
        password: '',
        isGithub: true
    });
    return done(null, newUser);
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));   