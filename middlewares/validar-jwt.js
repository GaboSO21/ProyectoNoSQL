const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No token',
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer usuario que corresponde a uid
        const usuario = await Usuario.findById(uid);

        if (!usuario) {

            return res.status(401).json({
                msg: 'No token',
            })

        }

        // Verificar si el uid tiene estado en true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'No token',
            })
        }

        req.usuario = usuario;

        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no valido',
        })

    }

}

module.exports = {
    validarJWT
}
