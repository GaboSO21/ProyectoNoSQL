const { Schema, Types, model } = require("mongoose");

const criticaSchema = Schema({

    jornalista: {
        type: String,
        required: [true, 'El jornalista es obligatorio']
    },
    media: {
        type: Types.ObjectId,
        required: [true, 'La media es obligatoria']
    },
    desc: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    }

})

criticaSchema.methods.toJSON = function() {

    const { __v, ...critica } = this.toObject();
    return critica;

}

module.exports = model('Critica', criticaSchema);
