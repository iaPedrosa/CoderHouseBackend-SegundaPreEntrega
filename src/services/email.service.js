import { createTransport } from "nodemailer";
import 'dotenv/config';
import { env } from "process";
import e from "express";
import { get } from "http";
import factory from '../persistence/daos/factory.js';
const {userDao} = factory;

export const transporter = createTransport({
    service: 'gmail',
    // host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const createMsgRegister = (first_name) => {
    return `<h1>Hola ${first_name}, ¡Bienvenido/a a iaPedrosa Shop!</h1>`
};

const createMsgReset = (first_name,token) => {
    return `<h1>Hola ${first_name}, ¡Hacé click 
    <a href='http://localhost:3000/new-pass?tok=${token}'>AQUI</a> 
    para restablecer tu contraseña!</h1>`
};


export const sendMail = async(user, service, token) => {
    try {

        
        const usuario = await userDao.getByEmail(user);

        const { first_name, email } = usuario;

       let msg = '';
       service === 'register'
       ? msg = createMsgRegister(first_name)
       : service === 'resetPass'
       ? msg = createMsgReset(first_name,token)
       : msg = '';

       let subj = '';
       subj = 
       service === 'register'
       ? 'Bienvenido/a'
       : service === 'resetPass'
       ? 'Restablecimiento de contraseña'
       : ''; 


       
       const gmailOptions = {
        from: env.EMAIL,
        to: email,
        subject: subj,
        html: msg
       };

       const response = await transporter.sendMail(gmailOptions);
       
       if(token !== null) return token;
       console.log('email enviado');
    } catch (error) {
        throw new Error(error.message);
    }
};
