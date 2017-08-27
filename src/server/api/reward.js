import express from 'express';
import models from '../models';

const app = express.Router();

app.get('/reward/:id',
	(req, res, next) => {
		models.Reward.findById(req.params.id)
			.then(reward => {
				res.json(reward);
			})
			.catch((err) => {
				next(err);
			});
	}
);

app.delete('/reward/:id',
	(req, res, next) => {
		models.Reward.findById(req.params.id)
			.then(reward => {
				return reward.destroy();
			})
			.then(() => {
				res.status(204).send();
			})
			.catch((err) => {
				next(err);
			});
	}
);

app.post('/reward/',
	(req, res, next) => {
		models.Reward.create(req.body)
			.then((reward) => {
				res.json(reward);
			})
			.catch((err) => {
				next(err);
			});
	}
);

export default app;
