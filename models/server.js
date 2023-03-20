const express = require('express');
const cors = require('cors');
const { connectDB } = require('../db/config');

// Clase de servidor express

class Server {

    // Constructor que inicializa la aplicacion, establece puerto,
    // rutas para apis, inicializar db y middlewares
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Conectar db
        this.database();

        // Middlewares
        this.middlewares();

        // Rutas de app
        this.routes();
    }

    async database() {

        await connectDB();

    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Parseo y lectura del body
        this.app.use(express.json());

        // Directorio public/static
        this.app.use(express.static('public'));

    }

    routes() {

        this.app.use(this.usersPath, require('../routes/user'));

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
        });

    }

}

module.exports = Server;

