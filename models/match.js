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
module.exports.updateMatch = (query, doc, callback) => {
	Match.replaceOne(query, doc, callback);
};

// delete match
module.exports.deleteMatch = (query, callback) => {
	Match.deleteOne(query, callback);
};
