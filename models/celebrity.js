'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Celebrity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Celebrity.init({
    name: DataTypes.STRING,
    dob: DataTypes.STRING,
    sign_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Celebrity',
  });
  return Celebrity;
};