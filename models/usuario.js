const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    primApellido: {
        type: String,
        required: [true, 'El primer apellido es obilgatorio']
    },
    segApellido: {
        type: String,
        required: false
    },
    cedula: {
        type: String,
        required: [true, 'La cedula es obligatoria']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La password es obligatorio'],
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    }

});

usuarioSchema.methods.toJSON = function() {

    const { __v, password, ...user } = this.toObject();
    return user;

}

module.exports = mongoose.model('Usuario', usuarioSchema);
