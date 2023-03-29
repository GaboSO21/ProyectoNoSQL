const { Schema, model } = require("mongoose");

const mediaSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    url: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    }

})

mediaSchema.methods.toJSON = function() {

    const { __v, ...media } = this.toObject();
    return media;

}

module.exports = model('Media', mediaSchema);
