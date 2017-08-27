export default function (sequelize, DataTypes) {
	const Member = sequelize.define('Member', {
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

	Member.associate = (models) => {
		Member.belongsToMany(models.Reward, {
			onDelete: 'CASCADE',
			through: 'MemberReward',
		});
	};

	return Member;
}
