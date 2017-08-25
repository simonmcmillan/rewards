import Sequelize from 'sequelize';
import db from '../stores/postgres';
import Reward from './reward';

const Member = db.define('reward', {
	firstName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	rewards: {
		type: Sequelize.STRING,
	},
});

Member.belongsToMany(Reward, {
	through: 'UserReward',
	onDelete: 'CASCADE',
});

export default Member;
