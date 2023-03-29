const { Schema, Types, model } = require("mongoose");

const cineSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    pais: {
        type: String,
        required: [true, 'El pais es obligatorio']
    },
    ciudad: {
        type: String,
        required: [true, 'La ciudad es obligatoria']
    },
    peliculas: {
        type: [Types.ObjectId],
        required: [true, 'Las peliculas son obligatorias']
    }

})

cineSchema.methods.toJSON = function() {

    const { __v, ...cine } = this.toObject();
    return cine;

}

module.exports = model('Cine', cineSchema);
