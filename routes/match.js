const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// helper (keeps this file small)
const matchDetailsValidation = require('../helper/matchValidate');
const matchDetails = require('../helper/matchDetails');

// models
const Match = require('../models/match');

// save match details on db
router.post(
	'/add',
	[matchDetailsValidation.validate, body('datePlayed').trim().notEmpty()],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let match = new Match();
		let d = new Date();
		match.dateAdded = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
		match.datePlayed = req.body.datePlayed;
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
	}
);

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
				match.dateAdded = doc.dateAdded;
				let d = new Date();
				match.dateLastModified = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
				matchDetails.details(match, req.body);

				Match.updateMatch(req.params.id, match, (err) => {
					if (err) {
						res.json({ success: false, msg: err.message });
					} else {
						res.json({
							success: true,
							msg: 'Match successfully updated',
						});
					}
				});
			}
		}
	});
});

// delete match
router.delete('/delete/:id', (req, res) => {
	Match.showMatch(req.params.id, (err, doc) => {
		if (err) {
			res.json({ success: false, msg: err.message });
		} else {
			if (!doc) {
				res.json({ success: false, msg: 'Match not found' });
			} else {
				Match.deleteMatch(req.params.id, (err) => {
					if (err) {
						res.json({ success: false, msg: err.message });
					} else {
						res.json({
							success: true,
							msg: 'Match successfully deleted',
						});
					}
				});
			}
		}
	});
});

module.exports = router;
