import * as service from '../services/product.services.js';
import * as serviceCart from '../services/cart.services.js';
import * as serviceUser from '../services/user.services.js';
import { socketServer } from '../server.js';

export const createFileCtr = async (req, res, next) => {
  try {
    const newProducts = await service.createFileUser();
    if (!newProducts) throw new Error('Error de validacion!');
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

    const products = await service.getAll();

    socketServer.emit('productCreated', products);

    res.json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, sort, filter, filterValue } = req.query;
    const response = await service.getAllProducts(
      page,
      limit,
      sort,
      filter,
      filterValue,
    );

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
    if (filterValue) {
      nextQueryParams.append('filterValue', filterValue);
      prevQueryParams.append('filterValue', filterValue);
    }

    nextQueryParams.append('page', response.nextPage || 1);
    prevQueryParams.append('page', response.prevPage || 1);

    const baseUrl = 'http://localhost:8080/';
    const nextPage = response.hasNextPage
      ? `${baseUrl}?${nextQueryParams.toString()}`
      : null;
    const prevPage = response.hasPrevPage
      ? `${baseUrl}?${prevQueryParams.toString()}`
      : null;

    if (page > response.totalPages)
      res.status(404).json({ error: 'No hay mas productos' });

    res.status(200).json({
      status: 'success',
      payload: response.docs,
      totalPages: response.totalPages,
      hasPrevPage: response.prevPage ? true : false,
      hasNextPage: response.nextPage ? true : false,
      hasPrevPage: !!response.prevPage,
      hasNextPage: !!response.nextPage,
      page: !Number(response.page) ? 1 : response.page,
      prevPage,
      nextPage,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPage = async (req, res, next) => {
  try {
    const user = await serviceUser.userInfo(req.session.email);

    const { page, limit, sort, filter, filterValue, status } = req.query;
    const products = await service.getAllProducts(
      page,
      limit,
      sort,
      filter,
      filterValue,
      status,
    );
    console.log(status);

    const plainProducts = products.docs.map((product) =>
      product.toObject({ virtuals: true }),
    );

    let cartID;

    if (req.cookies.cartID) {
      const cartIDCookie = req.cookies.cartID;
      const cartIDObject = await serviceCart.getCart(cartIDCookie);

      if (cartIDObject) {
        if (cartIDObject.email == req.session.email) {
          cartID = cartIDObject._id.toString();
        }
      }
    }

    // Si la cookie no existe, crearemos un nuevo carrito
    if (!cartID) {

      //buscamos si hay un cart con el email
      const cartIDObject = await serviceCart.getCartByEmail(req.session.email);
      if (cartIDObject) {
        cartID = cartIDObject._id.toString();
      }else{

      const newCart = await serviceCart.createCart(req.session.email);
      cartID = newCart._id;
    }

      // Configurar la cookie en la respuesta antes de enviarla
      res.cookie('cartID', cartID, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días (el tiempo que la cookie se mantendrá válida)
        httpOnly: true, // La cookie no puede ser accedida desde JavaScript (seguridad)
      });
    }

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
    if (filterValue) {
      nextQueryParams.append('filterValue', filterValue);
      prevQueryParams.append('filterValue', filterValue);
    }

    if (filterValue) {
      nextQueryParams.append('status', status);
      prevQueryParams.append('status', status);
    }

    nextQueryParams.append('page', products.nextPage || 1);
    prevQueryParams.append('page', products.prevPage || 1);

    const baseUrl = 'http://localhost:8080/';

    const categories = await service.getCategories();

    const nextPage = products.hasNextPage
      ? `/products?${nextQueryParams.toString()}`
      : null;
    const prevPage = products.hasPrevPage
      ? `/products?${prevQueryParams.toString()}`
      : null;

    if (page > products.totalPages)
      res.render('index', { error: 'No hay mas productos' });


      if(user.role == 'admin'){
        res.render('index', {
          products: plainProducts,
          nextPage,
          prevPage,
          cartID,
          categories,
          user: user.first_name,
          role: user.role,
          admin: true
        });
      } else {
        res.render('index', {
          products: plainProducts,
          nextPage,
          prevPage,
          cartID,
          categories,
          user: user.first_name,
          role: user.role,
          
        });
      }



    
  } catch (error) {
    next(error);
  }
};

export const getByIdPage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await service.getById(id);
    if (!products)
      return res.render('index', { error: 'Producto no encontrado' });
    const plainProducts = products.toObject({ virtuals: true });

    res.render('index', { products: [plainProducts] });
  } catch (error) {
    next(error);
  }
};

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
};

export const update = async (req, res, next) => {
  try {
    const product = req.body;
    const { id } = req.params;

    const updatedProduct = await service.update(id, product);
    if (!updatedProduct) res.status(400).json({ error: 'Error al actualizar' });
    else res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await service.remove(id);
    if (!deletedProduct) res.status(400).json({ error: 'Error al eliminar' });
    else {
      const products = await service.getAll();

      socketServer.emit('productCreated', products);
      res.json({ message: 'Producto eliminado', producto: deletedProduct });
    }
  } catch (error) {
    next(error);
  }
};

export const api = async (req, res, next) => {
  try {
    res.render('documentation');
  } catch (error) {
    next(error);
  }
};
