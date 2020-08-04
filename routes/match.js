const express = require('express');
const router = express.Router();
const { body, validationResult, oneOf } = require('express-validator');

// models
const Match = require('../models/match');

const matchDetailsValidation = [
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

// save match details on db
router.post('/add', matchDetailsValidation, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	let match = new Match();
	// user iD
	match.userID = '123';
	// model
	match.playingStyle = req.body.playingStyle;
	match.date = Date();
	match.playedAgainst = req.body.playedAgainst;
	match.playedAt = req.body.playedAt;
	match.tournament = req.body.tournament;
	match.matchOvers = req.body.matchOvers;
	// feild
	match.catches = req.body.fieldCatches;
	match.runOuts = req.body.fieldRO;
	match.stumps = req.body.fieldStumps;
	if (
		req.body.playingStyle == 'batOnly' ||
		req.body.playingStyle == 'allRounder'
	) {
		// bat
		match.bat_runs = req.body.batRuns;
		match.bat_balls = req.body.batBalls;
		match.bat_dots = req.body.batDots;
		match.bat_ones = req.body.batOnes;
		match.bat_twos = req.body.batTwos;
		match.bat_threes = req.body.batThrees;
		match.bat_fours = req.body.batFours;
		match.bat_fives = req.body.batFives;
		match.bat_sixes = req.body.batSixes;
		match.bat_notOut = req.body.batNO;
		match.bat_batPos = req.body.batBatPos;
	}
	if (
		req.body.playingStyle == 'bowlOnly' ||
		req.body.playingStyle == 'allRounder'
	) {
		// bowl
		match.bowl_overs = req.body.bowlOvers;
		match.bowl_wickets = req.body.bowlWickets;
		match.bowl_dots = req.body.bowlDots;
		match.bowl_maidens = req.body.bowlMaidens;
		match.bowl_runs = req.body.bowlRuns;
		match.bowl_noBalls = req.body.bowlNoBalls;
		match.bowl_wides = req.body.bowlWides;
		match.bowl_fours = req.body.bowlFours;
		match.bowl_sixes = req.body.bowlSixes;
	}

	Match.addMatch(match, (err) => {
		if (err) {
			res.json({ success: false, msg: err.message });
		} else {
			res.json({
				success: true,
				msg: 'Match details successfully added',
			});
		}
	});
});

module.exports = router;
