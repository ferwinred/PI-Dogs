const { Dogs, Temperaments, Op} = require("../db");
const {getDb, getAPI} = require('./requests');


const getDogs = async (name) => {
  try{
  const api = await getAPI();
  const db = await getDb();
  const dogs = [...db, ...api];
    console.log('info a mostrar: ', dogs[0])
  if(name){
    let dog = dogs.filter(e => e.name.toUpperCase().includes(name.toUpperCase()));
    return dog;
  };
  // console.log('info a mostrar: ', dogs)
  return dogs;  } catch (error) {
    console.log("Se encontro un error en getDogs", error);
  };
};

const getId = async (id)=>{
  try{
  const dogsA = await getAPI();
  const dogsDb = await getDb();
  const dog = dogsA.filter(e => e.id === Number(id)).length > 0 ? dogsA.find(e => e.id === Number(id)) : dogsDb.find(e => e.id === id);

  return dog;} catch (error){
    console.log("Se encontro un error en getId", error);
  };
};

const getTemp = async () => {
  try{
      const tempsDb = await Temperaments.findAll();
      const dogsA = await getAPI();
    // console.log('info de la db: ', dogsDb);
    // console.log('info de la api: ', dogsA);
      if(tempsDb.length > 0){
        return tempsDb; 
      };

      const temp = new Set();
      dogsA.forEach(e => {
        e.temperament.split(', ').forEach(el => temp.add(el));
      });
      
      const dogsFind = Array.from(temp);

      const temps = dogsFind.map((e,i) => {
        return {
          name: e,
        }
        });
      const allTemps = await Temperaments.bulkCreate(temps);

       return allTemps;
  } catch(error){
    console.log("Se encontro un error en getTemp", error);
  };
};

const addDog = async (body) => {
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
    } = body;
  
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

    console.log(temperaments)
  temperaments.map(async el => {
    const temp = await Temperaments.findOne({
          where: {
              name : el
          }, 
          include: [Dogs]
      })
      temp.id && dog.setTemperaments(temp.id)
  })
 
 
    return dog;

  } catch(error){
    console.log("Se encontro un error en el addDog", error);
  };
};

const deleteId = async (id) => {
  try{
        let dog = await Dogs.destroy({
          where: {
            id: id
          }
        });
    
        return dog;

  } catch(error){
    console.log("Se encontro un error en el deleteId", error);
  };
};

module.exports = {
  getDogs,
  getId,
  getTemp,
  addDog,
  deleteId,
}