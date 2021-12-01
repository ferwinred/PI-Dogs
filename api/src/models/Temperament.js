const { DataTypes} = require("sequelize");


module.exports = (sequelize) => {
   sequelize.define("temperaments",{
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
  } 
}, {
  timestamps:false,
},
) 

}