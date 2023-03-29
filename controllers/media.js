const { response, request } = require('express');

const Media = require('../models/media');

// Controladores: encargados de resolver las peticions http y retornar o 
// asignar datos dependiendo del caso

const mediaGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0, nombre } = req.query;

    if (nombre) {

        const media = await Media.findOne({
            nombre
        });

        return res.json({
            media
        });

    } else {

        const [medias, total] = await Promise.all([
            Media.find()
                .skip(Number(desde))
                .limit(Number(limite)),
            Media.countDocuments()
        ]);

        return res.json({
            total,
            medias
        });

    }

}

// Peticion POST, ingresa nuevo usuario a la coleccion
const mediaPost = async (req = request, res = response) => {

    // Desestructurar campos de peticion http 
    const { nombre, url } = req.body;

    // Creacion de modelo Usuario para la bd
    const media = new Media({
        nombre,
        url
    });

    // Guardar en db
    await media.save();

    // Retornar un mensaje junto a la media que fue salvada
    res.json({
        media,
        msg: 'Media registrada exitosamente'
    });

}

// Peticion PUT, actualiza datos de la coleccion
const mediaPut = async (req = request, res = response) => {

    // Desestructura parametros del url, id en este caso
    const { id } = req.params;

    // Agarrar campos que no se quieren actualizar
    const { _id, ...resto } = req.body;

    // Encontrar usuario a actualizar y actualizarlo
    const media = await Media.findByIdAndUpdate(id, resto);

    // Peticion exitosa status 201
    res.status(201).json({
        media,
        msg: 'Media actualizada existosamente'
    });

}

const mediaDelete = async (req, res = response) => {

    const { id } = req.params;

    // Fisicamente borrar
    const media = await Media.findOneAndDelete(id);

    res.json({
        media,
        msg: 'Media borrado exitosamente'
    });

}

module.exports = {
    mediaGet,
    mediaPost,
    mediaPut,
    mediaDelete
}
