const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({

    nombre: {
        type: String,
    },
    primApellido: {
        type: String,
    },
    segApellido: {
        type: String,
        required: false
    },
    cedula: {
        type: String,
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

    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;

}

module.exports = mongoose.model('Usuario', usuarioSchema);
