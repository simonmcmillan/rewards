import { Server } from 'http';
import app from './app';
import config from './config';

function createServer () {
	const http = Server(app);
	const port = config.get('port');

	http.listen(port, (err) => {
		if (err) {
			console.log('Server error');
			return void(0);
		}
		console.log('server listening on port %s', port);
	});
}


export default createServer;
