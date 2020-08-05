const { body } = require('express-validator');

exports.validate = [
	body('batRuns')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'batOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('batBalls')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'batOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('batDots')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'batOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('batOnes')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'batOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('batTwos')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'batOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('batThrees')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'batOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('batFours')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'batOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('batFives')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'batOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('batSixes')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'batOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('batNO')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'batOnly'
			)
		)
		.trim()
		.isBoolean(),
	body('batBatPos')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'batOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('bowlOvers')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'bowlOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('bowlWickets')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'bowlOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('bowlRuns')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'bowlOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('bowlDots')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'bowlOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('bowlMaidens')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'bowlOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('bowlNoBalls')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'bowlOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('bowlWides')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'bowlOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('bowlFours')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'bowlOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('bowlSixes')
		.if(
			body('playingStyle').custom(
				(value) => value == 'allRounder' || value == 'bowlOnly'
			)
		)
		.trim()
		.notEmpty(),
	body('playedAgainst').trim().notEmpty(),
	body('playedAt').trim().notEmpty(),
	body('tournament').trim().notEmpty(),
	body('matchOvers').trim().notEmpty(),
	body('fieldCatches').trim().notEmpty(),
	body('fieldRO').trim().notEmpty(),
	body('fieldStumps').trim().notEmpty(),
];
