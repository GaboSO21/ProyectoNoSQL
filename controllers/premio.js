const { response, request } = require('express');

const Premio = require('../models/premio');

// Controladores: encargados de resolver las peticions http y retornar o 
// asignar datos dependiendo del caso

const premioGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0, nombre } = req.query;

    if (nombre) {

        const premio = await Premio.findOne({
            nombre
        });

        return res.json({
            premio
        });

    } else {

        const [premios, total] = await Promise.all([
            Premio.find()
                .skip(Number(desde))
                .limit(Number(limite)),
            Premio.countDocuments()
        ]);

        return res.json({
            total,
            premios
        });

    }

}

// Peticion POST, ingresa nuevo usuario a la coleccion
const premioPost = async (req = request, res = response) => {

    // Desestructurar campos de peticion http 
    const { evento, nombre, anno } = req.body;

    // Creacion de modelo Usuario para la bd
    const premio = new Premio({
        evento,
        nombre,
        anno
    });

    // Guardar en db
    await premio.save();

    // Retornar un mensaje junto a director que fue salvado
    res.json({
        premio,
        msg: 'Premio registrado exitosamente'
    });

}

// Peticion PUT, actualiza datos de la coleccion
const premioPut = async (req = request, res = response) => {

    // Desestructura parametros del url, id en este caso
    const { id } = req.params;

    // Agarrar campos que no se quieren actualizar
    const { _id, ...resto } = req.body;

    // Encontrar usuario a actualizar y actualizarlo
    const premio = await Premio.findByIdAndUpdate(id, resto);

    // Peticion exitosa status 201
    res.status(201).json({
        premio,
        msg: 'Premio actualizado existosamente'
    });

}

const premioDelete = async (req, res = response) => {

    const { id } = req.params;

    // Fisicamente borrar
    const premio = await Premio.findOneAndDelete(id);

    res.json({
        premio,
        msg: 'Premio borrado exitosamente'
    });

}

module.exports = {
    premioGet,
    premioPost,
    premioPut,
    premioDelete
}
