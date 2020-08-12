const express = require('express');
const router = express.Router();

// models
const Match = require('../models/match');

// overall
router.get('/overall', (req, res) => {
	Match.listOverall('123', async (err, docs) => {
		if (err) {
			res.json({ success: false, msg: err.message });
		} else {
			let years = [];
			for (let i = 0; i < docs.length; i++) {
				if (i == 0) {
					years.push(docs[i].datePlayed.split('-')[2]);
				} else {
					let flag = 0;
					for (let j = 0; j < years.length; j++) {
						if (docs[i].datePlayed.split('-')[2] == years[j]) {
							flag = 1;
							break;
						}
					}
					if (flag == 0) {
						years.push(docs[i].datePlayed.split('-')[2]);
					}
				}
			}

			let result = [];

			for (let i = 0; i < years.length; i++) {
				let year = [];
				for (let j = 1; j <= 31; j++) {
					for (let k = 1; k <= 12; k++) {
						year.push(j + '-' + k + '-' + years[i]);
					}
				}

				let op = await Match.progressOverall('123', year);
				if (op.error) {
					result.push({ year: years[i], op: op.error });
				} else {
					result.push({ year: years[i], op: op.doc });
				}
			}
			res.json({ success: true, result });
		}
	});
});

// tournament
router.get('/tournament', async (req, res) => {
	const tournament = req.body.tournament;
	let op = await Match.progressTournament('123', tournament);
	if (op.error) {
		res.json({ success: false, op: op.error });
	} else {
		res.json({ success: true, op: op.matches });
	}
});

// year
router.get('/year', async (req, res) => {
	const yearIP = req.body.year;
	let year = [];
	for (let j = 1; j <= 31; j++) {
		for (let k = 1; k <= 12; k++) {
			year.push(j + '-' + k + '-' + yearIP);
		}
	}
	let doc = await Match.listMatches('123', 'date', year);
	let months = [];
	for (let i = 0; i < doc.doc.length; i++) {
		if (i == 0) {
			months.push(doc.doc[i].datePlayed.split('-')[1]);
		} else {
			let flag = 0;
			for (let j = 0; j < months.length; j++) {
				if (doc.doc[i].datePlayed.split('-')[1] == months[j]) {
					flag = 1;
					break;
				}
			}
			if (flag == 0) {
				months.push(doc.doc[i].datePlayed.split('-')[1]);
			}
		}
	}
	let result = [];
	for (let i = 0; i < months.length; i++) {
		let docs = await Match.progressYear('123', months[i], yearIP);
		if (docs.error) {
			result.push({ date: months[i], docs: docs.error });
		} else {
			result.push({ date: months[i], docs: docs.doc });
		}
	}
	res.json({ success: true, result });
});

module.exports = router;
