import express from 'express';
import bodyParser from 'body-parser';
import member from './api/member';
import reward from './api/reward';

const app = express();

app.use(bodyParser.json());
app.use('/api/', member);
app.use('/api/', reward);

//Generic error handler
/*eslint-disable*/
app.use((err, req, res, next) => {
	if (!err.status) {
		err.status = 500;
		err.errors = 'Something went wrong!';
	}
	console.error(err.stack);
	res.status(err.status).send(err.errors);
});

export default app;
