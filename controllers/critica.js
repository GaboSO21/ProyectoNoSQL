const { response, request } = require('express');

const Critica = require('../models/critica');

// Controladores: encargados de resolver las peticions http y retornar o 
// asignar datos dependiendo del caso

const criticaGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0, id } = req.query;

    if (id) {

        const critica = await Critica.findOne({
            _id: id
        });

        return res.json({
            critica
        });

    } else {

        const [criticas, total] = await Promise.all([
            Critica.find()
                .skip(Number(desde))
                .limit(Number(limite)),
            Critica.countDocuments()
        ]);

        return res.json({
            total,
            criticas
        });

    }

}

// Peticion POST, ingresa nuevo usuario a la coleccion
const criticaPost = async (req = request, res = response) => {

    // Desestructurar campos de peticion http 
    const { jornalista, media, desc } = req.body;

    // Creacion de modelo Usuario para la bd
    const critica = new Critica({
        jornalista,
        media,
        desc
    });

    // Guardar en db
    await critica.save();

    // Retornar un mensaje junto a critica que fue salvado
    res.json({
        critica,
        msg: 'Critica registrada exitosamente'
    });

}

// Peticion PUT, actualiza datos de la coleccion
const criticaPut = async (req = request, res = response) => {

    // Desestructura parametros del url, id en este caso
    const { id } = req.params;

    // Agarrar campos que no se quieren actualizar
    const { _id, ...resto } = req.body;

    // Encontrar usuario a actualizar y actualizarlo
    const critica = await Critica.findByIdAndUpdate(id, resto);

    // Peticion exitosa status 201
    res.status(201).json({
        critica,
        msg: 'Director actualizado existosamente'
    });

}

const criticaDelete = async (req, res = response) => {

    const { id } = req.params;

    // Fisicamente borrar
    const critica = await Critica.findOneAndDelete(id);

    res.json({
        critica,
        msg: 'Director borrado exitosamente'
    });

}

module.exports = {
    criticaGet,
    criticaPost,
    criticaPut,
    criticaDelete
}
