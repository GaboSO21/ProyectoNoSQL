const express = require('express');
const { check } = require('express-validator');
const { premioGet, premioPut, premioPost, premioDelete } = require('../controllers/premio');
const { existePremioID } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');

// Rutas: resuelven las rutas usadas para las peticiones http

const router = express.Router();

router.get('/', premioGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existePremioID),
    validarCampos
], premioPut);

router.post('/', [
    check('evento', 'El evento es obligatorio').notEmpty(),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('anno', 'La fecha es obligatoria').notEmpty(),
    check('anno', 'La fecha no es valida').isDate(),
    validarCampos,
], premioPost);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existePremioID),
    validarCampos
], premioDelete);

module.exports = router;
