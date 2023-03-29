const { Schema, model } = require("mongoose");

const premioSchema = Schema({

    evento: {
        type: String,
        required: [true, 'El evento es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre del premio es obligatorio']
    },
    anno: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
    }

})

premioSchema.methods.toJSON = function() {

    const { __v, ...premio } = this.toObject();
    return premio;

}

module.exports = model('Premio', premioSchema);
