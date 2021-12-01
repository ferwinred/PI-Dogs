const axios = require('axios');
const {API_KEY} = process.env;
const { Dogs, Temperaments} = require("../db");

const getAPI = async () => {

    try{
    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

    const apiInfo = await api.data.map((e)=> {
        return {
            id: e.id,
            name: e.name,
            max_height: (e.height.metric.split(" - ")[0]-"") ? (e.height.metric.split(' - ')[1] || e.height.metric.split(' - ')[0]) : 1,
            min_height: (e.height.metric.split(" - ")[0]-"") ? e.height.metric.split(' - ')[0] : 1,
            max_weight: (e.weight.metric.split(" - ")[0]-"") ? (e.weight.metric.split(' - ')[1] || e.weight.metric.split(' - ')[0]) : 1,
            min_weight: (e.weight.metric.split(" - ")[0]-"") ? e.weight.metric.split(' - ')[0] : 1,
            life_time_max: e.life_span.split(' - ')[1] ? e.life_span.split(' - ')[1].split(' ')[0] : e.life_span.split(' ')[0],
            life_time_min: e.life_span.split(' - ')[1] ? e.life_span.split(' - ')[0] : e.life_span.split(' ')[0],
            temperaments: e.temperament ? e.temperament : 'no tiene temperamentos',
            image: e.image.url,
        };
    });
    // console.log("informacion de la api", apiInfo)
    return apiInfo;} catch (error) {
      console.log("Hubo un error en el getAPI", error);
    };
};

const getDb = async () => {
   
     try{
       return await Dogs.findAll({
        include: {
          model: Temperaments,
          attributes: ["name"], 
          through: {
            attributes: [], 
          },
        },
      });} catch (error) {
        console.log("Hubo un error en getDbInfo", error);
      };
   
  };


module.exports = {
    getDb,
    getAPI,
}