const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Director = require('../models/director');
const Premio = require('../models/premio');
const Media = require('../models/media');
const Critica = require('../models/critica');
const Rating = require('../models/rating');
const Pelicula = require('../models/pelicula');
const Cine = require('../models/cine');

// Validaciones contra base de datos

// Validar si rol ingresado existe
const esRolValido = async (rol = '') => {

    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {

        throw new Error(`El rol ${rol} no esta registrado en la BD`);

    }

};

// Verificar si email ingresado ya existe
const existeEmail = async (correo = '') => {

    const checkCorreo = await Usuario.findOne({ correo });

    if (checkCorreo) {

        throw new Error(`El correo ${correo} ya existe`);

    }

};

// Verificar si existe usuario por ID
const existeUsuarioID = async (id) => {

    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {

        throw new Error(`El id ${id} no esta registrado en la BD`);

    }

};

// Verificar si existe director por ID
const existeDirectorID = async (id) => {

    const existeDirector = await Director.findById(id);

    if (!existeDirector) {

        throw new Error(`El id ${id} no esta registrado en la BD`);

    }

};

// Verificar si existe director por ID
const existePremioID = async (id) => {

    const existePremio = await Premio.findById(id);

    if (!existePremio) {

        throw new Error(`El id ${id} no esta registrado en la BD`);

    }

};

const existeMediaID = async (id) => {

    const existeMedia = await Media.findById(id);

    if (!existeMedia) {

        throw new Error(`El id ${id} no esta registrado en la BD`);

    }

}

const existeCriticaID = async (id) => {

    const existeCritica = await Critica.findById(id);

    if (!existeCritica) {

        throw new Error(`El id ${id} no esta registrado en la BD`);

    }

}

const existeRatingID = async (id) => {

    const existeRating = await Rating.findById(id);

    if (!existeRating) {

        throw new Error(`El id ${id} no esta registrado en la BD`);

    }
}

const existePeliculaID = async (id) => {

    const existePelicula = await Pelicula.findById(id);

    if (!existePelicula) {

        throw new Error(`El id ${id} no esta registrado en la BD`);

    }
}

const existeCineID = async (id) => {

    const existeCine = await Cine.findById(id);

    if (!existeCine) {

        throw new Error(`El id ${id} no esta registrado en la BD`);

    }
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioID,
    existeDirectorID,
    existePremioID,
    existeMediaID,
    existeCriticaID,
    existeRatingID,
    existePeliculaID,
    existeCineID
};
