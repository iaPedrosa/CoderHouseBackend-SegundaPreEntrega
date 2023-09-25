import { Router } from 'express';
import * as controller from '../controllers/products.controllers.js';
import { objValidator } from '../middlewares/productValidator.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { HttpResponse } from '../middlewares/http.response.js'
const httpResponse = new HttpResponse();

const router = Router();

router.get('/', controller.getAll);
router.get("/mockingproducts", controller.mockingProducts)

router.get('/:id', controller.getById);
router.get('/dto/:id', controller.getByIdDTO);


const persistence = process.env.PERSISTENCE || 'mongo';

if (persistence === 'mongo') {
    router.param('id', (req, res, next, id) => {
        const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
        if (id.match(mongoIdRegex)) {
            next();
        }
        else {
         
            httpResponse.NotFound(res, 'Formato del ID Invalido')
        }
    });
} 


router.post('/dto',isAdmin, controller.createProdDTO);
router.post('/file',isAdmin, controller.createFileCtr); //Este comando es para borrar todos los productos/carritos de la base de datos y crear nuevos a partir de un archivo json
router.post('/',isAdmin,objValidator, controller.create);
router.put('/:id',isAdmin, controller.update);
router.delete('/:id',isAdmin, controller.remove);



export default router;