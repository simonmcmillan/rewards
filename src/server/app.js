import express from 'express';
import bodyParser from 'body-parser';
import models from './models';

const app = express();

app.get('/user/:id',
	(req, res) => {
		models.Member.findById(req.params.id)
			.then(member => {
				console.log('MEMBER', member);
				res.json(member);
			});
	}
);

//Generic error handler
/*eslint-disable*/
app.use((err, req, res, next) => {
	if (!err.status) {
		err.status = 500;
		err.errors = 'Something went wrong!';
	}

	res.status(err.status).send(err.errors);
});

export default app;
