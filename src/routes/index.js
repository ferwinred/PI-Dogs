const { Router } = require('express');
// Importar todos los routers;
const router = Router();
const Dogs = require('./dogs.routes');
const Temp = require('./temperament.routes');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use(express.json());

router.use('/dogs', Dogs);
router.use('/temperaments', Temp);

module.exports = router;
