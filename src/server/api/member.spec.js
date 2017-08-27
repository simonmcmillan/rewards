import request from 'supertest';
import app from '../app';
import models from '../models';

describe('Member API', () => {
	beforeEach((done) => {
		models.sequelize.sync({ force: true })
			.then(() => {
				Promise.all(
					[
						models.Member.create({ firstName: 'John', lastName: 'Snow' }),
						models.Reward.create({ type: 'Points', meta: 1234 }),
					]
				)
					.then(() => {
						done();
					});
			});
	});

	it('GETs a member', () => {
		return request(app)
			.get('/api/member/1/')
			.expect(200)
			.expect('Content-Type', /json/)
			.then(res => {
				/* eslint-disable*/
				res.body.firstName.should.equal('John');
				res.body.lastName.should.equal('Snow');
			});
	});
	it('DELETEs a member', () => {
		return request(app)
			.delete('/api/member/1/')
			.expect(204);
	});
	it('POSTs a member', () => {
		return request(app)
			.post('/api/member/')
			.send({ firstName: 'George', lastName: 'Martin' }) // sends a JSON post body
			.expect('Content-Type', /json/)
			.then(res => {
				/* eslint-disable*/
				res.body.firstName.should.equal('George');
				res.body.lastName.should.equal('Martin');

				return models.Member.count();
			})
			.then((count) => {
				//check that there is now 2 members in the db
				count.should.equal(2);
			})

	});
	it('PUTs a member associated with a reward', () => {
		return request(app)
			.put('/api/member/reward/')
			.send(
				{
					"id": 1,
					"Rewards": [{
						"id": 1
					}]
				}
			)
			.expect('Content-Type', /json/)
			.then((res) => {
				res.body.id.should.equal(1).which.is.a.Number();
				res.body.Rewards.length.should.equal(1);
			})
	});
});
