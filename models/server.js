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

        // Rutas apis
        this.usersPath = '/api/users';
        this.peliPath = '/api/pelicula';
        this.directorPath = '/api/director';
        this.ratingPath = '/api/rating';
        this.premioPath = '/api/premio';
        this.criticaPath = '/api/critica';
        this.mediaPath = '/api/media';
        this.cinePath = '/api/cine';
        this.loginPath = '/api/auth';

        // Rutas vistas
        this.viewPath = '/view';

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

        // this.app.use(this.cinePath, require('../routes/cine'));
        this.app.use(this.criticaPath, require('../routes/critica'));
        this.app.use(this.directorPath, require('../routes/director'));
        this.app.use(this.mediaPath, require('../routes/media'));
        this.app.use(this.peliPath, require('../routes/pelicula'));
        this.app.use(this.premioPath, require('../routes/premio'));
        this.app.use(this.ratingPath, require('../routes/rating'));
        this.app.use(this.usersPath, require('../routes/user'));
        this.app.use(this.viewPath, require('../routes/views'));
        this.app.use(this.loginPath, require('../routes/auth'));

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
        });

    }

}

module.exports = Server;
