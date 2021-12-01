const { Router } = require('express');
const morgan = require('morgan')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Dogs = require('./dogs');
const Temp = require('./temperament');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use(express.json());
router.use(morgan('dev'))
router.use('/dogs', Dogs);
router.use('/temperaments', Temp);

module.exports = router;
