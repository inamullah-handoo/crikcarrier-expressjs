const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');

const matchDetailsValidation = require('../helper/validate');
const matchDetails = require('../helper/matchDetails');

// models
const Match = require('../models/match');

// save match details on db
router.post('/add', matchDetailsValidation.validate, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	let match = new Match();
	match.datePlayed = Date();
	match.dateLastModified = 'Not Modified';
	matchDetails.details(match, req.body);

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

// show match details
router.get('/view/:id', (req, res) => {
	Match.showMatch(req.params.id, (err, match) => {
		if (err) {
			res.json({ success: false, msg: err });
		} else {
			res.json({
				success: true,
				match,
			});
		}
	});
});

// modify match details
router.post('/modify/:id', matchDetailsValidation.validate, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	Match.showMatch(req.params.id, (err, doc) => {
		if (err) {
			res.json({ success: false, msg: err.message });
		} else {
			if (!doc) {
				res.json({ success: false, msg: 'Not Found!' });
			} else {
				let match = {};
				match.datePlayed = doc.datePlayed;
				match.dateLastModified = Date();
				matchDetails.details(match, req.body);
				Match.updateMatch({ _id: req.params.id }, match, (err) => {
					if (err) {
						res.json({ success: false, msg: err.message });
					} else {
						res.json({ success: true, msg: 'Updated' });
					}
				});
			}
		}
	});
});

module.exports = router;
