const express = require('express');
const router = express.Router();

// models
const Match = require('../models/match');

// overall
router.get('/overall', (req, res) => {
	Match.listOverall('123', (err, docs) => {
		if (err) {
			res.json({ success: false, msg: err.message });
		} else {
			if (!docs[0]) {
				res.json({ success: false, msg: 'No matches found' });
			} else {
				res.json({ success: true, docs });
			}
		}
	});
});

// tournament
router.get('/tournament', async (req, res) => {
	let doc = await Match.listMatches('123', 'tournament', req.body.tournament);
	if (doc.error) {
		res.json({ success: false, msg: doc.error });
	} else {
		res.json({ success: true, msg: doc.doc });
	}
});

// month
router.get('/month', async (req, res) => {
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
router.get('/year', async (req, res) => {
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
