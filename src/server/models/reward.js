export default function (sequelize, DataTypes) {
	const Reward = sequelize.define('Reward', {
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		amount: {
			type: DataTypes.INTEGER,
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
}
