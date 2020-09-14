const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// models
const Match = require('../models/match');

// overall
router.get('/overall', async (req, res) => {
	let doc = await Match.listMatches('123', 'overall');
	if (doc.error) {
		res.json({ success: false, msg: doc.error });
	} else {
		res.json({ success: true, msg: doc.doc });
	}
});

// tournament
router.get(
	'/tournament',
	[body('tournament').trim().notEmpty()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let doc = await Match.listMatches(
			'123',
			'tournament',
			req.body.tournament
		);
		if (doc.error) {
			res.json({ success: false, msg: doc.error });
		} else {
			res.json({ success: true, msg: doc.doc });
		}
	}
);

// month
router.get('/month', [body('month').trim().notEmpty()], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	let month = [];
	for (let i = 1; i <= 31; i++) {
		month.push(i + '-' + req.body.month);
	}
	let doc = await Match.listMatches('123', 'date', month);
	if (doc.error) {
		res.json({ success: false, msg: doc.error });
	} else {
		res.json({ success: true, msg: doc.doc });
	}
});

// year
router.get('/year', [body('year').trim().notEmpty()], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	let year = [];
	for (let i = 1; i <= 31; i++) {
		for (let j = 1; j <= 12; j++) {
			year.push(i + '-' + j + '-' + req.body.year);
		}
	}
	let doc = Match.listMatches('123', 'date', year);
	if (doc.error) {
		res.json({ success: false, msg: doc.error });
	} else {
		res.json({ success: true, msg: doc.doc });
	}
});

module.exports = router;
