const { validationResult } = require('express-validator');

// Middlewares: usados entre la peticion http (GET, POST, PUT, DELETE ...)
// y el controlador para revisar validez de datos y demas

// Middleware para, despues de realizar validaciones,
// retorna json con errores presentes en la peticion con status 400
const validarCampos = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();

}

module.exports = {
    validarCampos
}

