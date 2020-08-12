const mongoose = require('mongoose');

// item schema

const matchSchema = mongoose.Schema({
	playingStyle: {
		type: String,
		required: true,
	},
	userID: {
		type: String,
		required: true,
	},
	datePlayed: {
		type: String,
		required: true,
	},
	dateLastModified: {
		type: String,
		required: true,
	},
	dateAdded: {
		type: String,
		required: true,
	},
	playedAgainst: {
		type: String,
		required: true,
	},
	playedAt: {
		type: String,
		required: true,
	},
	tournament: {
		type: String,
		required: true,
	},
	matchOvers: {
		type: Number,
		required: true,
	},
	// feild
	catches: {
		type: Number,
		required: true,
	},
	runOuts: {
		type: Number,
		required: true,
	},
	stumps: {
		type: Number,
		required: true,
	},
	// bat
	bat_runs: {
		type: Number,
	},
	bat_balls: {
		type: Number,
	},
	bat_dots: {
		type: Number,
	},
	bat_ones: {
		type: Number,
	},
	bat_twos: {
		type: Number,
	},
	bat_threes: {
		type: Number,
	},
	bat_fours: {
		type: Number,
	},
	bat_fives: {
		type: Number,
	},
	bat_sixes: {
		type: Number,
	},
	bat_notOut: {
		type: Boolean,
	},
	bat_batPos: {
		type: Number,
	},
	// bowl
	bowl_overs: {
		type: Number,
	},
	bowl_wickets: {
		type: Number,
	},
	bowl_dots: {
		type: Number,
	},
	bowl_maidens: {
		type: Number,
	},
	bowl_runs: {
		type: Number,
	},
	bowl_noBalls: {
		type: Number,
	},
	bowl_wides: {
		type: Number,
	},
	bowl_fours: {
		type: Number,
	},
	bowl_sixes: {
		type: Number,
	},
});

const Match = (module.exports = mongoose.model('Match', matchSchema));

// functions

// save match
module.exports.addMatch = (doc, callback) => {
	doc.save(callback);
};

// show match
module.exports.showMatch = (id, callback) => {
	Match.findById(id, callback);
};

// update match
module.exports.updateMatch = (id, doc, callback) => {
	Match.replaceOne({ _id: id }, doc, callback);
};

// delete match
module.exports.deleteMatch = (id, callback) => {
	Match.deleteOne({ _id: id }, callback);
};

// listView all matches for a user
module.exports.listOverall = (id, callback) => {
	Match.find({ userID: id }, callback);
};

// listView matches for a user
module.exports.listMatches = async (id, key, value) => {
	let query = {},
		doc = [],
		error = false;
	if (key == 'tournament') {
		query = { userID: id, tournament: value };
	} else if (key == 'date') {
		query = { userID: id, datePlayed: value };
	}
	await Match.find(query, (err, docs) => {
		if (err) {
			error = err;
		} else {
			if (!docs[0]) {
				error = 'No matches found';
			} else {
				doc = docs;
			}
		}
	});
	return { error, doc };
};

// progress overall
module.exports.progressOverall = async (id, value) => {
	let batRuns = 0,
		batInnings = 0,
		batBalls = 0,
		bowlWickets = 0,
		bowlRuns = 0,
		bowlBalls = 0,
		catches = 0,
		runOuts = 0,
		stumps = 0,
		error = false;
	await Match.find(
		{
			userID: id,
			datePlayed: value,
		},
		(err, doc) => {
			if (err) {
				error = err;
			} else {
				if (!doc[0]) {
					error = 'No matches found';
				} else {
					for (let i = 0; i < doc.length; i++) {
						catches += doc[i].catches;
						runOuts += doc[i].runOuts;
						stumps += doc[i].stumps;
						if (doc[i].bat_batPos) {
							batRuns += doc[i].bat_runs;
							batBalls += doc[i].bat_balls;
							if (!doc[i].bat_notOut) {
								batInnings++;
							}
						}
						if (doc[i].bowl_overs) {
							bowlWickets += doc[i].bowl_wickets;
							bowlRuns += doc[i].bowl_runs;
							bowlBalls += doc[i].bowl_overs * 6;
						}
					}
				}
			}
		}
	);
	return {
		error,
		doc: {
			batRuns,
			batInnings,
			batBalls,
			bowlWickets,
			bowlRuns,
			bowlBalls,
			catches,
			runOuts,
			stumps,
		},
	};
};

// progress tournament
module.exports.progressTournament = async (id, value) => {
	let matches = [],
		error = false;
	await Match.find(
		{
			userID: id,
			tournament: value,
		},
		(err, doc) => {
			if (err) {
				error = err;
			} else {
				for (let i = 0; i < doc.length; i++) {
					let temp = {};
					if (doc[i].bat_batPos) {
						temp.bat = {
							batRuns: doc[i].bat_runs,
							batBalls: doc[i].bat_balls,
						};
					}
					if (doc[i].bowl_overs) {
						temp.bowl = {
							bowlWickets: doc[i].bowl_wickets,
							bowlRuns: doc[i].bowl_runs,
							bowlBalls: doc[i].bowl_overs * 6,
						};
					}
					matches.push({
						bat: temp.bat,
						bowl: temp.bowl,
						opposite: doc[i].playedAgainst,
						catches: doc[i].catches,
						runOuts: doc[i].runOuts,
						stumps: doc[i].stumps,
					});
				}
			}
		}
	);
	return { matches, error };
};

// progress year
module.exports.progressYear = async (id, month, year) => {
	let date = [],
		error = false,
		batRuns = 0,
		batBalls = 0,
		bowlWickets = 0,
		bowlRuns = 0,
		bowlBalls = 0,
		catches = 0,
		runOuts = 0,
		stumps = 0;
	for (let i = 0; i <= 31; i++) {
		date.push(i + '-' + month + '-' + year);
	}
	let query = { userID: id, datePlayed: date };
	await Match.find(query, (err, doc) => {
		if (err) {
			error = err;
		} else {
			catches = doc[0].catches;
			runOuts = doc[0].runOuts;
			stumps = doc[0].stumps;
			if (doc[0].bat_batPos) {
				batRuns = doc[0].bat_runs;
				batBalls = doc[0].bat_balls;
			}
			if (doc[0].bowl_overs) {
				bowlWickets = doc[0].bowl_wickets;
				bowlRuns = doc[0].bowl_runs;
				bowlBalls = doc[0].bowl_overs * 6;
			}
		}
	});
	return {
		error,
		doc: {
			batRuns,
			batBalls,
			bowlWickets,
			bowlRuns,
			bowlBalls,
			catches,
			runOuts,
			stumps,
		},
	};
};
