const express = require('express');
const { check } = require('express-validator');
const { mediaGet, mediaPut, mediaPost, mediaDelete } = require('../controllers/media');
const { existeMediaID } = require('../helpers/db-validators');


const { validarCampos } = require('../middlewares/validar-campos');

// Rutas: resuelven las rutas usadas para las peticiones http

const router = express.Router();

router.get('/', mediaGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeMediaID),
    validarCampos
], mediaPut);

router.post('/', [
    check('nombre', 'El evento es obligatorio').notEmpty(),
    check('url', 'El url no es valido').isURL(),
    check('url', 'El url es obligatorio').notEmpty(),
    validarCampos,
], mediaPost);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeMediaID),
    validarCampos
], mediaDelete);

module.exports = router;
