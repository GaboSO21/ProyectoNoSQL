const express = require('express');

const { testGet, login } = require('../controllers/views');

// Rutas: resuelven las rutas usadas para las peticiones http

const router = express.Router();

router.get('/test', [], testGet);

router.get('/login', [], login);

module.exports = router;
