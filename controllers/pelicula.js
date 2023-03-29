const { response, request } = require('express');

const Pelicula = require('../models/pelicula');

// Controladores: encargados de resolver las peticions http y retornar o 
// asignar datos dependiendo del caso

const peliculaGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0, nombre } = req.query;

    if (nombre) {

        const pelicula = await Pelicula.findOne({
            nombre
        });

        return res.json({
            pelicula
        });

    } else {

        const [peliculas, total] = await Promise.all([
            Pelicula.find()
                .skip(Number(desde))
                .limit(Number(limite)),
            Pelicula.countDocuments()
        ]);

        return res.json({
            total,
            peliculas
        });

    }

}

// Peticion POST, ingresa nuevo usuario a la coleccion
const peliculaPost = async (req = request, res = response) => {

    // Desestructurar campos de peticion http 
    const { genero, titulo, fecha, criticas, premios, director, rating } = req.body;

    // Creacion de modelo Usuario para la bd
    const pelicula = new Pelicula({
        genero,
        titulo,
        fecha,
        criticas,
        premios,
        director,
        rating
    });

    // Guardar en db
    await pelicula.save();

    // Retornar un mensaje junto a la pelicula que fue salvada
    res.json({
        pelicula,
        msg: 'Pelicula registrada exitosamente'
    });

}

// Peticion PUT, actualiza datos de la coleccion
const peliculaPut = async (req = request, res = response) => {

    // Desestructura parametros del url, id en este caso
    const { id } = req.params;

    // Agarrar campos que no se quieren actualizar
    const { _id, ...resto } = req.body;

    // Encontrar usuario a actualizar y actualizarlo
    const pelicula = await Pelicula.findByIdAndUpdate(id, resto);

    // Peticion exitosa status 201
    res.status(201).json({
        pelicula,
        msg: 'Pelicula actualizada existosamente'
    });

}

const peliculaDelete = async (req, res = response) => {

    const { id } = req.params;

    // Fisicamente borrar
    const pelicula = await Pelicula.findOneAndDelete(id);

    res.json({
        pelicula,
        msg: 'Pelicula borrado exitosamente'
    });

}

module.exports = {
    peliculaGet,
    peliculaPost,
    peliculaPut,
    peliculaDelete
}
