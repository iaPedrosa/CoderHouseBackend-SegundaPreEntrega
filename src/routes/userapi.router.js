import { Router } from "express";
import { registerResponse, loginResponse ,logoutUser,registerJWT,loginJWT,premium,resetPass,updatePass,getUsers,deleteOldUsers} from "../controllers/users.controllers.js";
import passport from 'passport';
import { isAdmin } from "../middlewares/isAdmin.js";
import { uploadProfile,uploadProduct } from '../middlewares/multer.js';
import fs from 'fs';

import { __dirname } from '../utils.js';

import factory from "../persistence/daos/factory.js";
const { userDao,prodDao } = factory;
import { canUpdateProduct } from "../middlewares/canUpdateProduct.js";


const router = Router();



router.post('/:uid/documents/profile', uploadProfile, async(req, res)=>{
    try {
        

        const user = await userDao.getById(req.params.uid);
        
        const index = user.documents.findIndex(document => document.name === 'FotoDePerfil');
        
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

router.post('/:pid/documents/product',canUpdateProduct, uploadProduct, async(req, res)=>{
    try {
        
        const product = await prodDao.getById(req.params.pid);
        if (!product) return res.status(404).json({message: 'Product not found'});

        //Revisamos si product.imagen es distinto de /products/sinimagen.jpeg y si lo es borramos el archivo
        if(product.imagen !== '/products/sinimagen.jpeg') {
            fs.unlinkSync(__dirname + '/public' + product.imagen);
        }
    
       
        
        product.imagen = '/products/' + req.file.filename
        
        
        await prodDao.update(product);
        res.json(product)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post('/premium/:id',isAdmin, premium);


router.get('/',getUsers)
router.delete('/',isAdmin,deleteOldUsers)


export default router;

