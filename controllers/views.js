const { response, request } = require('express');

// Controladores: encargados de resolver las peticions http y retornar o 
// asignar datos dependiendo del caso

const testGet = async (req = request, res = response) => {

    res.sendFile('/home/gabo-arch/Documents/Universidad/Cuatri_4/ProyectoNoSQL/public/views/test.html');

}

module.exports = {
    testGet,
}







