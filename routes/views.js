const express = require('express');

const { testGet } = require('../controllers/views');

// Rutas: resuelven las rutas usadas para las peticiones http

const router = express.Router();

router.get('/test', [], testGet);

module.exports = router;
