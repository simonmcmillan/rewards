Express / Sequelize boilerplate
=====================

To run:

1. Make sure you have NVM installed, then type `nvm use`. Or have node > v6

2. Make sure you have postgres installed. The app will try to connect with the following parameters:

	`username: 'dbuser', database: 'rewards'`.

	Feel free to change these in `src/server/config.js`.

3. `yarn install`

4. `yarn run start`, this will also create the db and tables.

5. There are no fixtures So you will need to populate the db with the below endpoints.

To run tests

1. `yarn run test`


---
Endpoints
=========
*Members*

1. POST
	/api/member/
	```
	{
		"firstName": "test",
		"lastName": "user"
	}
	```

2. GET
	/api/member/:id

3. DELETE
	/api/member/:id


4. PUT
	/api/member/reward/

	This associates a member with a reward(s).

	```
	{
		"id": 1,
		"Rewards": [
			{
				"id": 1
			},
			{
				"id": 2
			}
		]
	}
	```

*Rewards*

1. POST
	/api/reward/
	```
	{
		"type": "test",
		"meta": 1234
	}
	```

2. GET
	/api/reward/:id

3. DELETE
	/api/reward/:id
