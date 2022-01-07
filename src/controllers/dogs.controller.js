const { Dogs, Temperaments, Op } = require("../db");
const { getDb, getAPI } = require("../middlewares/apiRequests");

const getDogs = async (req, res, next) => {
  try {
    let { name } = req.query;
    // console.log('como va la info: ', dogs)
    const api = await getAPI();
    const db = await getDb();
    const dogs = [...db, ...api];

    // console.log('info a mostrar: ', dogs[0])

    if (name) {
      let dog = dogs.filter((e) =>
        e.name.toUpperCase().includes(name.toUpperCase())
      );
      return res.json(dogs);
    }

    // console.log('info a mostrar: ', dogs)
    if (dogs) return res.json(dogs);

    res.status(400).send("Lo siento no se encontró el perrito que buscas");
  } catch (error) {
    next(error);
  }
};

const getDogById = async (req, res, next) => {
  try {
    let { id } = req.params;

    const dogsA = await getAPI();
    const dogsDb = await getDb();
    const dog =
      dogsA.filter((e) => e.id === Number(id)).length > 0
        ? dogsA.find((e) => e.id === Number(id))
        : dogsDb.find((e) => e.id === id);

    if (dog) return res.json(dog);

    res.status(400).send("No se encontró ningún perrito con ese ID");
  } catch (error) {
    next(error);
  }
};

const createDog = async (req, res, next)=>{
  try{
      
      const {
        name,
        max_height,
        min_height,
        max_weight,
        min_weight,
        life_time_max,
        life_time_min,
        temperaments,
        image,
      } = req.body;
  
      const dog = await Dogs.create({
        name,
        max_height,
        min_height,
        max_weight,
        min_weight,
        life_time_max,
        life_time_min,
        image,
      });
  
      // console.log(temperaments);
      temperaments.map(async (el) => {
        const temp = await Temperaments.findOne({
          where: {
            name: el,
          },
          include: [Dogs],
        });
        temp.id && dog.setTemperaments(temp.id);
      });

      return res.json({msg: "El perrito fue creado con éxito"});
  } catch(error){
      next(error);
  }
}
    

const deleteDog = async (req, res, next) => {
  try {
      const {id} = req.params

      let dog = await Dogs.destroy({
        where: {
          id: id,
        },
      });

      console.log(dog)

      dog ? res.send('se eliminó el perrito 🐶😢') : res.status(400).send('No se encontró ningún perrito con ese ID');

  } catch (error) {
      next(error);
  }
  }
    

module.exports = {
  getDogs,
  getDogById,
  createDog,
  deleteDog,
};
