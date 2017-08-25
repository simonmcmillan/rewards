import Sequelize from 'sequelize';
import config from '../config';
const {
	database,
	username,
	host,
	dialect,
} = config.get('postgres');

const sequelize = new Sequelize(
	database, username, null, { host, dialect }
);

sequelize
	.authenticate()
	.then(() => {
		console.log('Postgres db connected.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

export default sequelize;
