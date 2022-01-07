const { Temperaments, Op} = require("../db");
const { getAPI } = require('../middlewares/apiRequests');


const getTemp = async (req, res, next)=>{
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
          e.temperaments.split(', ').forEach(el => temp.add(el));
        });
        
        const dogsFind = Array.from(temp);
  
        const temps = dogsFind.map((e,i) => {
          return {
            name: e,
          }
          });
        const allTemps = await Temperaments.bulkCreate(temps);
        
        res.json(allTemps);

    } catch(error){
        next(error);
    }
};

module.exports = {
    getTemp,
}