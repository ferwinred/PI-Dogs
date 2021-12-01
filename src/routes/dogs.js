const express = require('express');
const router = express.Router();
const {getDogs, getId, addDog, deleteId} = require('./models')

router.get('/', async (req, res) => {
    try{
    let {name} = req.query;
    let dogs = await getDogs(name);
    // console.log('como va la info: ', dogs)
    if(dogs) return res.json(dogs);
    res.status(400).send('Lo siento no se encontró el perrito que buscas');} catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next)=>{
    try{
    let {id} = req.params;
    let dog = await getId(id);

    if(dog) return res.json(dog);

    res.status(400).send('No se encontró ningún perrito con ese ID');} catch(error){
        next(error);
    }
});

router.post('/', async (req, res, next)=>{
    try{
        const body = req.body;
        const dog = await addDog(body);

        res.json(dog);
    } catch(error){
        next(error);
    }
})

router.delete('/:id', async (req, res, next) => {
try {
    const {id} = req.params

    const dog = await deleteId(id);
    dog ? res.send('se eliminó el perrito 🐶😢') : res.status(400).send('No se encontró ningún perrito con ese ID'); 
} catch (error) {
    next(error);
}
})


module.exports = router;