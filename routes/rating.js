const express = require('express');
const { check } = require('express-validator');
const { ratingGet, ratingPut, ratingPost, ratingDelete } = require('../controllers/rating');
const { existeRatingID } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-rol');

// Rutas: resuelven las rutas usadas para las peticiones http

const router = express.Router();

router.get('/', validarJWT, ratingGet);

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeRatingID),
    validarCampos
], ratingPut);

router.post('/', [
    validarJWT,
    esAdminRole,
    check('puntaje', 'El puntaje es obligatorio').notEmpty(),
    check('votantes', 'Los votantes son obligatorios').notEmpty(),
    validarCampos,
], ratingPost);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeRatingID),
    validarCampos
], ratingDelete);

module.exports = router;
