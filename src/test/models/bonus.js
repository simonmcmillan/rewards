'use strict';
module.exports = function(sequelize, DataTypes) {
  var Bonus = sequelize.define('Bonus', {
    type: DataTypes.ENUM('LOYALTY'),
    amount: DataTypes.NUMBER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Bonus;
};