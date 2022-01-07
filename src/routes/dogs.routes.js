const express = require('express');
const router = express.Router();
const {getDogs, getDogById, createDog, deleteDog} = require('../controllers/dogs.controller')

router.get('/', getDogs);
router.get('/:id', getDogById);
router.post('/', createDog);
router.delete('/:id', deleteDog);


module.exports = router;