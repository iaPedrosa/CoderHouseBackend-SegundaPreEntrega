import { Router } from "express";
import { registerResponse, loginResponse ,logoutUser,registerJWT,loginJWT,premium,resetPass,updatePass,getUsers,deleteOldUsers} from "../controllers/users.controllers.js";
import passport from 'passport';
import { isAdmin } from "../middlewares/isAdmin.js";
import { uploadProfile,uploadProduct,uploadDocument } from '../middlewares/multer.js';
import fs from 'fs';

import { __dirname } from '../utils.js';

import factory from "../persistence/daos/factory.js";
const { userDao,prodDao } = factory;
import { canUpdateProduct } from "../middlewares/canUpdateProduct.js";


const router = Router();


router.post('/:uid/documents/info/:id', uploadDocument, async(req, res)=>{
    try {
        
        //Utilizaremos el :id con las oppciones 1,2,3 para saber que documento es, si no es ninguna de esas opciones devolveremos un error
        if(req.params.id !== '1' && req.params.id !== '2' && req.params.id !== '3') return res.status(400).json({message: 'Invalid document id'});
        //El id 1 sera Identificacion, id2 Comprobante de domicilio y el id3 Comprobante de estado de cuenta
        const documentName = req.params.id === '1' ? 'Identificacion' : req.params.id === '2' ? 'Comprobante de domicilio' : 'Comprobante de estado de cuenta';



        const user = await userDao.getById(req.params.uid);
        
        const index = user.documents.findIndex(document => document.name === documentName);
        //Si existe el documento lo eliminamos
        if(index !== -1) {

            fs.unlinkSync(__dirname + '/public' + user.documents[index].reference);
            //Eliminamos el objeto del array
            user.documents.splice(index, 1);
        }

        
        const document = {
            name: documentName,
            reference: '/documents/' + req.file.filename
        }

        user.documents.push(document);
        
        //ponemos en true segun el documento que se subio
        if(req.params.id === '1') user.identificacion = true;
        if(req.params.id === '2') user.direccion = true;
        if(req.params.id === '3') user.estadoDeCuenta = true;
        
        
        await userDao.update(user);
        res.json(user)
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


router.post('/:uid/documents/profile', uploadProfile, async(req, res)=>{
    try {
        

        const user = await userDao.getById(req.params.uid);
        
        const index = user.documents.findIndex(document => document.name === 'FotoDePerfil');
        //Si existe el documento lo eliminamos
        if(index !== -1) {

            fs.unlinkSync(__dirname + '/public' + user.documents[index].reference);
            //Eliminamos el objeto del array
            user.documents.splice(index, 1);
        }

        
        const document = {
            name: 'FotoDePerfil',
            reference: '/profiles/' + req.file.filename
        }

        user.documents.push(document);
        user.profilepic = true;
        
        await userDao.update(user);
        res.json(user)
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post('/:pid/documents/product', canUpdateProduct, uploadProduct, async (req, res) => {
    try {
        const product = await prodDao.getById(req.params.pid);

        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Revisamos si product.imagen es distinto de /products/sinimagen.jpeg y si lo es borramos el archivo
        if (product.imagen !== '/products/sinimagen.jpeg') {
            try {
                fs.unlinkSync(__dirname + '/public' + product.imagen);
            } catch (error) {
                console.error('Error al eliminar el archivo:', error);
            }
        }


        product.imagen = '/products/' + req.file.filename


        await prodDao.update(product);
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/premium/:id',isAdmin, premium)


router.get('/',getUsers)
router.delete('/',isAdmin,deleteOldUsers)


export default router;

