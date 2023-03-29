const express = require('express');
const { check } = require('express-validator');
const { peliculaGet, peliculaPost, peliculaPut, peliculaDelete } = require('../controllers/pelicula');
const { existePeliculaID, existeCriticaID, existePremioID, existeDirectorID, existeRatingID } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');

// Rutas: resuelven las rutas usadas para las peticiones http
const router = express.Router();

router.get('/', peliculaGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existePeliculaID),
    validarCampos
], peliculaPut);

router.post('/', [
    check('genero', 'El genero es obligatorio').notEmpty(),
    check('titulo', 'El titulo es obligatorio').notEmpty(),
    check('fecha', 'La fecha es obligatoria').isDate().notEmpty(),
    check('criticas', 'Las criticas son obligatorias no es valido').isArray().notEmpty(),
    check('criticas').custom(existeCriticaID),
    check('premios', 'Las criticas son obligatorias no es valido').isArray().notEmpty(),
    check('premios').custom(existePremioID),
    check('director', 'Las criticas son obligatorias no es valido').isMongoId().notEmpty(),
    check('director').custom(existeDirectorID),
    check('rating', 'Las criticas son obligatorias no es valido').isMongoId().notEmpty(),
    check('rating').custom(existeRatingID),
    validarCampos,
], peliculaPost);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existePeliculaID),
    validarCampos
], peliculaDelete);

module.exports = router;
