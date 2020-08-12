const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to db
mongoose.connect(config.database, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
let db = mongoose.connection;
// check db connecction
db.once('open', () => console.log(`Connected to db ${config.database}`));
db.on('error', (err) => console.log(`Error in connecting to db: ${err}`));

// start express
const app = express();

// bodyparse middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors middleware
app.use(cors());

// route files
const main = require('./routes/main');
const match = require('./routes/match');
const list = require('./routes/listView');
const progress = require('./routes/progress');

//routes
app.use('/api/', main);
app.use('/api/match/', match);
app.use('/api/list/match/', list);
app.use('/api/progress/match/', progress);

// start server
let port = 3000;
app.listen(port, () => console.log(`Server started at ${port}`));
