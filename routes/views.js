const express = require('express');

const { testGet, login, register, movies } = require('../controllers/views');

// Rutas: resuelven las rutas usadas para las peticiones http

const router = express.Router();

router.get('/test', [], testGet);

router.get('/login', [], login);

router.get('/register', [], register);

router.get('/movies', [], movies);

module.exports = router;
