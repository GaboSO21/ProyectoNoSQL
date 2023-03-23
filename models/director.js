const mongoose = require('mongoose');

const direcSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    primApellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    segApellido: {
        type: String,
    },
    peliculas: {
        type: [mongoose.Schema.Types.ObjectId],
    }

});

direcSchema.methods.toJSON = function() {

    const { __v, ...director } = this.toObject();
    return director;

}

module.exports = mongoose.model('Director', direcSchema);




