export const objValidator = (req, res, next) => {
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
  
    if (
      !product.title ||
      !product.description ||
      !product.code ||
      !product.price ||
      !product.stock ||
      !product.category
    )
      res.status(401).send("All fields are required - title, description, code, price, stock, category");
    else next();
  };
  