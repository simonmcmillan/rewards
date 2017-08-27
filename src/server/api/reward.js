import express from 'express';
import models from '../models';

const app = express.Router();

app.get('/reward/:id',
	(req, res) => {
		models.Reward.findById(req.params.id)
			.then(reward => {
				res.json(reward);
			})
			.catch((err) => {
				console.log(err);
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
				console.log(err);
				next(err);
			});
	}
);

export default app;
