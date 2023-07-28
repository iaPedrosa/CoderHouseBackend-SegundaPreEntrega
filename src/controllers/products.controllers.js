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

export const create = async (req, res, next) => {
  try {
    const {
      title,
      description,
      code,
      price,
      stock,
      status,
      category,
      thumbnails,
    } = req.body;
    const product = {
      title,
      description,
      code,
      price,
      stock,
      status,
      category,
      thumbnails,
    };


    const newProduct = await service.create(product);
 
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
};




export const getAll = async (req, res, next) => {
  try {
      const { page, limit, sort, filter } = req.query; 
      const response = await service.getAllProducts(page, limit, sort, filter);

      const nextQueryParams = new URLSearchParams(); 
      const prevQueryParams = new URLSearchParams(); 
  

      if (limit) {
        nextQueryParams.append('limit', limit);
        prevQueryParams.append('limit', limit);
      }
      if (sort) {
        nextQueryParams.append('sort', sort);
        prevQueryParams.append('sort', sort);
      }
      if (filter) {
        nextQueryParams.append('filter', filter);
        prevQueryParams.append('filter', filter);
      }
  

      nextQueryParams.append('page', response.nextPage || 1);
      prevQueryParams.append('page', response.prevPage || 1);
  

      const baseUrl = 'http://localhost:8080/'; 
      const nextPage = response.hasNextPage ? `${baseUrl}?${nextQueryParams.toString()}` : null;
      const prevPage = response.hasPrevPage ? `${baseUrl}?${prevQueryParams.toString()}` : null;

      if (page > response.totalPages) res.status(404).json({ error: 'No hay mas productos' });
    
      res.status(200).json({
        status: 'success',
        payload: response.docs,
        totalPages: response.totalPages,
        hasPrevPage: (response.prevPage) ? true : false,
        hasNextPage: (response.nextPage) ? true : false,
        hasPrevPage: !!response.prevPage,
        hasNextPage: !!response.nextPage,
        page: !Number(response.page) ? 1 : response.page,
        prevPage,
        nextPage
      });

  } catch (error) {
      next(error);
  }
}



export const getAllPage = async (req, res, next) => {
  try {
    const { page, limit, sort, filter } = req.query; 
    const products = await service.getAllProducts(page, limit, sort, filter);
    
    const plainProducts = products.docs.map((product) => product.toObject({ virtuals: true }));

    const nextQueryParams = new URLSearchParams();
    const prevQueryParams = new URLSearchParams(); 

    if (limit) {
      nextQueryParams.append('limit', limit);
      prevQueryParams.append('limit', limit);
    }
    if (sort) {
      nextQueryParams.append('sort', sort);
      prevQueryParams.append('sort', sort);
    }
    if (filter) {
      nextQueryParams.append('filter', filter);
      prevQueryParams.append('filter', filter);
    }

   
    nextQueryParams.append('page', products.nextPage || 1);
    prevQueryParams.append('page', products.prevPage || 1);

   
    const baseUrl = 'http://localhost:8080/'; 
    const nextPage = products.hasNextPage ? `${baseUrl}?${nextQueryParams.toString()}` : null;
    const prevPage = products.hasPrevPage ? `${baseUrl}?${prevQueryParams.toString()}` : null;
    
    if (page > products.totalPages) res.render('index', { error: 'No hay mas productos' });

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

export const update = async (req, res, next) => {
 
  try {
    const product = req.body;
    const { id } = req.params;
    
 
    const updatedProduct = await service.update(id, product);
    if (!updatedProduct) res.status(400).json({ error:"Error al actualizar" });
    else res.json(updatedProduct);


  } catch (error) {
      next(error);
    
    
  }
}

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await service.remove(id);
    if (!deletedProduct) res.status(400).json({ error:"Error al eliminar" });
    else res.json({ message: "Producto eliminado", producto: deletedProduct });
    
  } catch (error) {
    next(error);
    
  }

}



