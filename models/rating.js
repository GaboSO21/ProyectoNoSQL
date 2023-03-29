const { Schema, model } = require('mongoose');

const ratingSchema = Schema({

    puntaje: {
        type: Number,
        required: [true, 'El puntaje es obligatrio']
    },
    votantes: {
        type: Number,
        required: [true, 'Los votantes son obligatorios']
    }

})

ratingSchema.methods.toJSON = function() {

    const { __v, ...rating } = this.toObject();
    return rating;

}

module.exports = model('Rating', ratingSchema);
