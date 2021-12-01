const express = require('express');
const router = express.Router();
const {getTemp} = require('./models');

router.get('/', async (req, res, next)=>{
    try{
        const temps = await getTemp();
        res.json(temps);

    } catch(error){
        next(error);
    }
});

module.exports = router;