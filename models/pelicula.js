const mongoose = require('mongoose');


const peliSchema = mongoose.Schema({

    genero: {
        type: String,
        required: [true, 'El genero es obligatorio']
    },
    titulo: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
    },
    criticas: {
        type: [mongoose.Schema.Types.ObjectId],
    },


});

peliSchema.methods.toJSON = function() {

    const { peli } = this.toObject();
    return peli;

}

module.exports = mongoose.model('Pelicula', peliSchema);


