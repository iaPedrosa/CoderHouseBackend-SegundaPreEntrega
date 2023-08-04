import UserDao from "../daos/mongodb/user.dao.js"
const userDao = new UserDao();
import * as service from '../services/product.services.js';

export const registerUser = async(req, res) => {
    try {
        const newUser = await userDao.registerUser(req.body);
        if(newUser) res.render('login', { error: 'Usuario creado!' });
        else res.render('register', { error: 'Ese mail ya esta registrado, o faltan campos de llenar' });
    } catch (error) {
        console.log(error);
    }
};

export const loginUser = async(req, res) => {
    try {
        const { email} = req.body;
        const user = await userDao.loginUser(req.body);
        if(user) {
            req.session.email = email;
            res.redirect('/products');
        } else res.render('login', { error: 'Usuario o contraseña incorrectos' });
    } catch (error) {
        console.log(error);
    }
};