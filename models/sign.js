'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Sign.init({
    sign_name: DataTypes.STRING,
    description: DataTypes.STRING,
    background: DataTypes.STRING,
    dates: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sign',
  });
  return Sign;
};