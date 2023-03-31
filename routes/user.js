const express = require('express');
const { check } = require('express-validator');
const { usersGet, usersPut, usersPost, usersDelete, usersPostAdmin } = require('../controllers/user');
const { esRolValido, existeEmail, existeUsuarioID } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-rol');

// Rutas: resuelven las rutas usadas para las peticiones http

const router = express.Router();

router.get('/', usersGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioID),
    check('rol').custom(esRolValido),
    validarCampos
], usersPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    // check('rol').custom(esRolValido),
    check('correo').custom(existeEmail),
    validarCampos,
], usersPost);

router.post('/admin', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeEmail),
    validarCampos
], usersPostAdmin)

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioID),
    validarCampos
], usersDelete);

module.exports = router;

