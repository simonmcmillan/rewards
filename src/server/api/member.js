import express from 'express';
import Promise from 'bluebird';
import models from '../models';
import error from '../errors/rewards-error';

const app = express.Router();

//Add existing rewards to existing member
app.put('/member/reward/',
	(req, res, next) => {
		if (!req.body.id || !req.body.Rewards.length) {
			next(error('Member id and Reward id required', 400));
		}
		//Fetch the member and rewards
		const memberPromise = models.Member.findById(req.body.id);
		const rewardPromises = req.body.Rewards.map((reward) => {
			if (!reward.id) {
				next(error('Reward id required', 400));
			}
			//Yes this really should be models.reward. Needs to be aliased in the model.
			return models.Reward.findById(reward.id);
		});

		Promise.join(memberPromise, Promise.all(rewardPromises), (member, rewards) => {
			if (!member) {
				next(error('Member not found', 400));
			}
			if (!rewards.length) {
				next(error('Rewards not found', 400));
			}
			//Loop through the rewards and check that it doesnt exist on the member
			//Only add the rewards that dont exist
			const addedRewardsPromises = rewards.map((reward) => {
				return member.hasReward(reward)
					.then((result) => {
						//if reward doesnt exist on member then add it
						if (!result) {
							return member.addReward(reward);
						}
						else {
							return Promise.resolve(null);
						}
					});
			});

			Promise.all(addedRewardsPromises)
				.then(() => {
					//For some odd reason sequelize returns the join table with addX() functions??!,
					//so we need to refetch the member with the associated rewards
					return models.Member.findOne({
						where: { 'id': member.id },
						include: [{ model: models.Reward }],
					}).then((member) => {
						res.json(member);
					});
				});
		});
	}
);

app.delete('/member/:id',
	(req, res, next) => {
		models.Member.findById(req.params.id)
			.then(member => {
				return member.destroy();
			})
			.then(() => {
				res.status(204).send();
			})
			.catch((err) => {
				next(err);
			});
	}
);

//find member
app.get('/member/:id',
	(req, res, next) => {
		models.Member.findById(req.params.id)
			.then(member => {
				res.json(member);
			})
			.catch((err) => {
				next(err);
			});
	}
);
//Add new member
app.post('/member/',
	(req, res, next) => {
		models.Member.create(req.body)
			.then((member) => {
				res.status(201);
				res.json(member);
			})
			.catch((err) => {
				next(err);
			});
	}
);


export default app;
