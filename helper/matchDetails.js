exports.details = (match, reqBody) => {
	// user iD
	match.userID = '123';
	// model
	match.playingStyle = reqBody.playingStyle;
	match.playedAgainst = reqBody.playedAgainst;
	match.playedAt = reqBody.playedAt;
	match.tournament = reqBody.tournament;
	match.matchOvers = reqBody.matchOvers;
	// feild
	match.catches = reqBody.fieldCatches;
	match.runOuts = reqBody.fieldRO;
	match.stumps = reqBody.fieldStumps;
	if (
		reqBody.playingStyle == 'batOnly' ||
		reqBody.playingStyle == 'allRounder'
	) {
		// bat
		match.bat_runs = reqBody.batRuns;
		match.bat_balls = reqBody.batBalls;
		match.bat_dots = reqBody.batDots;
		match.bat_ones = reqBody.batOnes;
		match.bat_twos = reqBody.batTwos;
		match.bat_threes = reqBody.batThrees;
		match.bat_fours = reqBody.batFours;
		match.bat_fives = reqBody.batFives;
		match.bat_sixes = reqBody.batSixes;
		match.bat_notOut = reqBody.batNO;
		match.bat_batPos = reqBody.batBatPos;
	}
	if (
		reqBody.playingStyle == 'bowlOnly' ||
		reqBody.playingStyle == 'allRounder'
	) {
		// bowl
		match.bowl_overs = reqBody.bowlOvers;
		match.bowl_wickets = reqBody.bowlWickets;
		match.bowl_dots = reqBody.bowlDots;
		match.bowl_maidens = reqBody.bowlMaidens;
		match.bowl_runs = reqBody.bowlRuns;
		match.bowl_noBalls = reqBody.bowlNoBalls;
		match.bowl_wides = reqBody.bowlWides;
		match.bowl_fours = reqBody.bowlFours;
		match.bowl_sixes = reqBody.bowlSixes;
	}
};
