import * as service from "../services/product.services.js";

export const createFileCtr = async (req, res, next) => {
    try {
      const newProducts = await service.createFileUser();
      if (!newProducts) throw new Error("Error de validacion!");
      else res.json(newProducts);
    } catch (error) {
      next(error);
    }
  };



export const getAll = async (req, res, next) => {
    try {
        const { page, limit } = req.query; 
        const response = await service.getAllProducts(page, limit);
        const next = response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}` : null;
        const prev = response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}` : null;
        res.json({
            info: {
                count: response.totalDocs,
                pages: response.totalPages,
                next,
                prev
            },
            results: response.docs
        });

    } catch (error) {
        next(error);
    }

}

export const getAllPage = async (req, res, next) => {
  try {
  
    const { page, limit } = req.query; 
    const products = await service.getAllProducts(page, limit);
    console.log(products);
    const plainProducts = products.docs.map((product) => product.toObject({ virtuals: true }));
    const nextPage = products.nextPage;
    const prevPage = products.prevPage;
    console.log(plainProducts);
  
    res.render('index', { products: plainProducts, nextPage, prevPage });
      
   

  } catch (error) {
      next(error);
  }

}

export const getByIdPage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await service.getById(id);
    const plainProducts = products.toObject({ virtuals: true });
    if (!plainProducts) throw new Error("Producto no encontrado!");
    
    else res.render('index', { products: [plainProducts]});
    
  } catch (error) {
      next(error);
    
  }
}

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.getById(id);
 
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
    
  } catch (error) {
      next(error);
    
  }
}


