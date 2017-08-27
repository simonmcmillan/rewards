import Sequelize from 'sequelize';
import sequelize from '../stores/postgres';

//list the paths to the models here
const models = [
	'./member',
	'./reward',
];
const db = {};

models.forEach((model) => {
	const importedModel = sequelize.import(model);
	db[importedModel.name] = importedModel;
});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
