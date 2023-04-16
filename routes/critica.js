const express = require('express');
const { check } = require('express-validator');

const { criticaGet, criticaPut, criticaPost, criticaDelete } = require('../controllers/critica');

const { existeCriticaID, existeMediaID } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-rol');

// Rutas: resuelven las rutas usadas para las peticiones http
const router = express.Router();

router.get('/', validarJWT, criticaGet);

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCriticaID),
    validarCampos
], criticaPut);

router.post('/', [
    validarJWT,
    esAdminRole,
    check('jornalista', 'El jornalista es obligatorio').not().isEmpty(),
    check('media', 'La media es obligatoria').isMongoId().notEmpty(),
    check('media').custom(existeMediaID),
    check('desc', 'La descripcion es obligatorio').notEmpty(),
    validarCampos,
], criticaPost);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCriticaID),
    validarCampos
], criticaDelete);

module.exports = router;
