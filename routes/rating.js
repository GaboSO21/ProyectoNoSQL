const express = require('express');
const { check } = require('express-validator');
const { ratingGet, ratingPut, ratingPost, ratingDelete } = require('../controllers/rating');
const { existeRatingID } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');

// Rutas: resuelven las rutas usadas para las peticiones http

const router = express.Router();

router.get('/', ratingGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeRatingID),
    validarCampos
], ratingPut);

router.post('/', [
    check('puntaje', 'El puntaje es obligatorio').notEmpty(),
    check('votantes', 'Los votantes son obligatorios').notEmpty(),
    validarCampos,
], ratingPost);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeRatingID),
    validarCampos
], ratingDelete);

module.exports = router;
