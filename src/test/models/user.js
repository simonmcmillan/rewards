'use strict';
module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		firstName: DataTypes.STRING,
		lastName: DataTypes.TEXT
	}, {
		classMethods: {
			associate: function(models) {
				// associations can be defined here
			}
		}
	});
	return User;
};
