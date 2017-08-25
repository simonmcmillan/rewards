import Sequelize from 'sequelize';
import db from '../stores/postgres';
import Member from './member';

const Reward = db.define('reward', {
	type: {
		type: Sequelize.ENUM('points'),
		allowNull: false,
	},
	amount: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

Reward.belongsToMany(Member, {
	through: 'UserReward',
});

export default Reward;
