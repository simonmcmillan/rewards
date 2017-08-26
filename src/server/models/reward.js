'use strict';

module.exports = (sequelize, DataTypes) => {
	const Reward = sequelize.define('Reward', {
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
	});

	Reward.associate = (models) => {
		Reward.belongsToMany(models.Member, {
			onDelete: 'CASCADE',
			through: 'MemberReward',
		});
	};

	return Reward;
};
