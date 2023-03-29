const { response, request } = require('express');

const Director = require('../models/director');

// Controladores: encargados de resolver las peticions http y retornar o 
// asignar datos dependiendo del caso

const directorGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0, id } = req.query;

    if (id) {

        const director = await Director.findById(
            id
        );

        return res.json({
            director
        });

    } else {

        const [directores, total] = await Promise.all([
            Director.find()
                .skip(Number(desde))
                .limit(Number(limite)),
            Director.countDocuments()
        ]);

        return res.json({
            total,
            directores
        });

    }

}

// Peticion POST, ingresa nuevo usuario a la coleccion
const directorPost = async (req = request, res = response) => {

    // Desestructurar campos de peticion http 
    const { nombre, primApellido, segApellido } = req.body;

    // Creacion de modelo Usuario para la bd
    const director = new Director({
        nombre,
        primApellido,
        segApellido
    });

    // Guardar en db
    await director.save();

    // Retornar un mensaje junto a director que fue salvado
    res.json({
        director,
        msg: 'Director registrado exitosamente'
    });

}

// Peticion PUT, actualiza datos de la coleccion
const directorPut = async (req = request, res = response) => {

    // Desestructura parametros del url, id en este caso
    const { id } = req.params;

    // Agarrar campos que no se quieren actualizar
    const { _id, ...resto } = req.body;

    // Encontrar usuario a actualizar y actualizarlo
    const director = await Director.findByIdAndUpdate(id, resto);

    // Peticion exitosa status 201
    res.status(201).json({
        director,
        msg: 'Director actualizado existosamente'
    });

}

const directorDelete = async (req, res = response) => {

    const { id } = req.params;

    // Fisicamente borrar
    const director = await Director.findOneAndDelete(id);

    res.json({
        director,
        msg: 'Director borrado exitosamente'
    });

}

module.exports = {
    directorGet,
    directorPost,
    directorPut,
    directorDelete
}
