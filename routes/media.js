const express = require('express');
const { check } = require('express-validator');

const { mediaGet, mediaPut, mediaPost, mediaDelete } = require('../controllers/media');

const { existeMediaID } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-rol');

// Rutas: resuelven las rutas usadas para las peticiones http

const router = express.Router();

router.get('/', validarJWT, mediaGet);

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeMediaID),
    validarCampos
], mediaPut);

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El evento es obligatorio').notEmpty(),
    check('url', 'El url no es valido').isURL(),
    check('url', 'El url es obligatorio').notEmpty(),
    validarCampos,
], mediaPost);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeMediaID),
    validarCampos
], mediaDelete);

module.exports = router;
