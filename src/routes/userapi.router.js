import { Router } from "express";
import { registerResponse, loginResponse ,logoutUser,registerJWT,loginJWT,premium,resetPass,updatePass} from "../controllers/users.controllers.js";
import passport from 'passport';
import { isAdmin } from "../middlewares/isAdmin.js";
import { uploadProfile,uploadProduct } from '../middlewares/multer.js';

import factory from "../persistence/daos/factory.js";
const { userDao,prodDao } = factory;
import { canUpdateProduct } from "../middlewares/canUpdateProduct.js";


const router = Router();



router.post('/:uid/documents/profile', uploadProfile, async(req, res)=>{
    try {
        

        const user = await userDao.getById(req.params.uid);
        
        const document = {
            name: 'FotoDePerfil',
            reference: req.file.path
        }
        user.documents.push(document);
        
        await userDao.update(user);
        res.json(user)
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post('/:pid/documents/product',canUpdateProduct, uploadProduct, async(req, res)=>{
    try {
        
        const product = await prodDao.getById(req.params.pid);
    
        
        const newDocument = {
            name: 'FotoDeProducto',
            reference: req.file.path
        }
        product.documents.push(newDocument);
        await prodDao.update(product);
        res.json(product)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post('/premium/:id',isAdmin, premium);





export default router;

