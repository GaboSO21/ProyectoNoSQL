const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {

            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            })

        }

        // Si usuario esta activo
        if (!usuario.estado) {

            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            })

        }

        // Verificar password
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {

            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            })

        }

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.nombre);

        res.json({
            nombre: usuario.nombre,
            token
        });

    } catch (error) {

        res.status(500).json({
            msg: 'Hable con admin',
        });

    }

}

const validatedToken = (req, res = response) => {

    return res.status(200).json({

        msg: 'Valid token'

    })

}

module.exports = {
    login,
    validatedToken
}
