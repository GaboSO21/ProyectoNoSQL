const Role = require('../models/role');
const Usuario = require('../models/usuario');

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

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioID
};

