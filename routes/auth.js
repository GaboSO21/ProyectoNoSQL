const express = require('express');
const { check } = require('express-validator');
const { login, validatedToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Rutas: resuelven las rutas usadas para las peticiones http

const router = express.Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/token', [
    validarJWT,
], validatedToken)

module.exports = router;
