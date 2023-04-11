const express = require('express');
const { check } = require('express-validator');

const { directorGet, directorPost, directorPut, directorDelete } = require('../controllers/director');

const { existeDirectorID } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-rol');

// Rutas: resuelven las rutas usadas para las peticiones http

const router = express.Router();

router.get('/', validarJWT, directorGet);

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeDirectorID),
    validarCampos
], directorPut);

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('primApellido', 'El primer apellido es obligatorio').notEmpty(),
    check('segApellido', 'El segundo apellido es obligatorio').notEmpty(),
    validarCampos,
], directorPost);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeDirectorID),
    validarCampos
], directorDelete);

module.exports = router;
