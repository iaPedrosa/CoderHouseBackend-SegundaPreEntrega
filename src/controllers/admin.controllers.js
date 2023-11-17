import factory from "../persistence/daos/factory.js";
import { generateToken } from "../jwt/auth.js";
const {userDao} = factory;
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../jwt/auth.js";
import UserRepository from "../persistence/repository/user/user.repository.js"
const userRepository = new UserRepository();
import { HttpResponse } from '../middlewares/http.response.js'
const httpResponse = new HttpResponse();
import {logger} from '../utils.js'




export const usersPanel = async (req, res) => {
  try {
    const users = await userRepository.getAllDTO();
    
    res.render('adminusers', { users: users });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const cambiarRol = async (req, res) => {
  try {
    const { id, rol } = req.body; 
  
    const user = await userDao.getById(id);

    user.role = rol;
    
    await userDao.update(user);


    res.redirect('/admin/users');

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cambiar el rol' });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.body; 
  
    await userDao.deleteUser(id);

    res.redirect('/admin/users');

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
}