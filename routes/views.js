const express = require('express');

const { testGet, login, register, movies, awards, directors, medias } = require('../controllers/views');

// Rutas: resuelven las rutas usadas para las peticiones http

const router = express.Router();

router.get('/test', [], testGet);

router.get('/login', [], login);

router.get('/register', [], register);

router.get('/director', [], directors);

router.get('/movies', [], movies);

router.get('/awards', [], awards);

router.get('medias', [], medias);

module.exports = router;
