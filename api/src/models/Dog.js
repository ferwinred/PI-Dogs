const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dogs', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    max_height: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    min_height: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    max_weight: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    min_weight: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    life_time_max: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    life_time_min: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },  {
    timestamps:true,
    createdAd: true,
    updatedAd: false,
  },);
};
