const errorMessage = "Debes insertar un valor en el campo";
const emailError = "Debes insertar un email válido";

export const validateRegister = [
  check("first_name", `${errorMessage} first_name`).exists().notEmpty(),
  check("last_name", `${errorMessage} last_name`).exists().notEmpty(),
  check("email", emailError).exists().isEmail(),
  check("pass", `${errorMessage} password`).exists().notEmpty(),
  check("pass", "El mínimo de caracteres es de 8").isLength({ min: 8 }),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403).send(error);
    }
  }
];
