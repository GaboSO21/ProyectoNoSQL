const mongoose = require('mongoose');

// Editar esto segun url y db a usar
const url = process.env.CONN_URL;

// Connects to local database
const connectDB = async () => {

    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('Conexion exitosa'))
        .catch(err => console.log(err, 'Error iniciando conexion'));

}

const disconnectDB = async () => {

    await mongoose.disconnect();

}

module.exports = {
    connectDB,
    disconnectDB
}


