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
    const authHeader = req.cookies.Authorization

    if (!authHeader) {

    
      httpResponse.NotFound(res, 'No user logged')

      
      return;
    }
    const decode = jwt.verify(authHeader, PRIVATE_KEY);
    
    const user = await userRepository.getByIdDTO(decode.userId);

    //buscamos en documentos la foto de perfil
    const urlFoto = user.documents.find(document => document.name === 'FotoDePerfil');
 
    const urlDirec = user.documents.find(document => document.name === 'Comprobante de domicilio');
    const urlIdent = user.documents.find(document => document.name === 'Identificacion');
    const urlEstado = user.documents.find(document => document.name === 'Comprobante de estado de cuenta');

    //Si no es undefined le hacemos toObject
    const urlFotoDePerfil = urlFoto ? urlFoto.toObject() : undefined;
    const urlDireccion = urlDirec ? urlDirec.toObject() : undefined;
    const urlIdentificacion = urlIdent ? urlIdent.toObject() : undefined;
    const urlEstadoDeCuenta = urlEstado ? urlEstado.toObject() : undefined;



    
    
    res.render('paneluser', { user, urlFotoDePerfil, urlDireccion, urlIdentificacion, urlEstadoDeCuenta});
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: error.message });
  }
};

