import request from 'supertest';
import app from '../app';
import models from '../models';

describe('reward API', () => {
	beforeEach((done) => {
		models.sequelize.sync({ force: true })
			.then(() => {
				models.Reward.create({ type: 'Points', meta: 1234 })
					.then(() => {
						done();
					});
			});
	});

	it('GETs a reward', () => {
		return request(app)
			.get('/api/reward/1/')
			.expect(200)
			.expect('Content-Type', /json/)
			.then(res => {
				/* eslint-disable*/
				res.body.type.should.equal('Points');
				res.body.meta.should.equal(1234);
			});
	});
	it('DELETEs a reward', () => {
		return request(app)
			.delete('/api/reward/1/')
			.expect(204);
	});
	it('POSTs a reward', () => {
		return request(app)
			.post('/api/reward/')
			.send({ type: 'Metal', meta: 666 })
			.expect('Content-Type', /json/)
			.then(res => {
				/* eslint-disable*/
				res.body.type.should.equal('Metal');
				res.body.meta.should.equal(666);

				return models.Reward.count();
			})
			.then((count) => {
				//check that there is now 2 rewards in the db
				count.should.equal(2);
			})
	});

});
