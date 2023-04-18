const { response, request } = require('express');

const Rating = require('../models/rating');

// Controladores: encargados de resolver las peticions http y retornar o 
// asignar datos dependiendo del caso

const ratingGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0, id } = req.query;

    if (id) {

        const rating = await Rating.findOne({
            _id: id
        });

        return res.json({
            rating
        });

    } else {

        const [ratings, total] = await Promise.all([
            Rating.find()
                .skip(Number(desde))
                .limit(Number(limite)),
            Rating.countDocuments()
        ]);

        return res.json({
            total,
            ratings
        });

    }

}

// Peticion POST, ingresa nuevo usuario a la coleccion
const ratingPost = async (req = request, res = response) => {

    // Desestructurar campos de peticion http 
    const { puntaje, votantes } = req.body;

    // Creacion de modelo Usuario para la bd
    const rating = new Rating({
        puntaje,
        votantes
    });

    // Guardar en db
    await rating.save();

    // Retornar un mensaje junto al rating que fue salvado
    res.json({
        rating,
        msg: 'Rating registrado exitosamente'
    });

}

// Peticion PUT, actualiza datos de la coleccion
const ratingPut = async (req = request, res = response) => {

    // Desestructura parametros del url, id en este caso
    const { id } = req.params;

    // Agarrar campos que no se quieren actualizar
    const { _id, ...resto } = req.body;

    // Encontrar usuario a actualizar y actualizarlo
    const rating = await Rating.findByIdAndUpdate(id, resto);

    // Peticion exitosa status 201
    res.status(201).json({
        rating,
        msg: 'Rating actualizado existosamente'
    });

}

const ratingDelete = async (req, res = response) => {

    const { id } = req.params;

    // Fisicamente borrar
    const rating = await Rating.findOneAndDelete(id);

    res.json({
        rating,
        msg: 'Rating borrado exitosamente'
    });

}

module.exports = {
    ratingGet,
    ratingPost,
    ratingPut,
    ratingDelete
}
