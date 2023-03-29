const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

// Controladores: encargados de resolver las peticions http y retornar o 
// asignar datos dependiendo del caso

const usersGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [usuarios, total] = await Promise.all([
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
        Usuario.countDocuments(query)
    ]);

    res.json({
        total,
        usuarios
    });

}

// Peticion POST, ingresa nuevo usuario a la coleccion
const usersPost = async (req = request, res = response) => {

    // Desestructurar campos de peticion http 
    const { nombre, correo, password, rol } = req.body;

    // Creacion de modelo Usuario para la bd
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });

    // Encriptar psswd
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en db
    await usuario.save();

    // Retornar un mensaje junto a usuario que fue salvado
    res.json({
        usuario
    });

}

// Peticion PUT, actualiza datos de la coleccion
const usersPut = async (req = request, res = response) => {

    // Desestructura parametros del url, id en este caso
    const { id } = req.params;
    // Agarrar campos que no se quieren actualizar
    const { _id, password, google, corre, ...resto } = req.body;

    // Encriptar psswd, si viene en el body
    if (password) {

        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }

    // Encontrar usuario a actualizar y actualizarlo
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    // Peticion exitosa status 201
    res.status(201).json({
        usuario
    });

}

const usersDelete = async (req, res = response) => {

    const { id } = req.params;

    // Fisicamente borrar
    const usuario = await Usuario.findOneAndUpdate(id, { estado: false });

    res.json({
        usuario
    });

}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}







