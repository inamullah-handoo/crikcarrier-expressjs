const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to db
mongoose.connect(config.database,  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true });
let db = mongoose.connection;
// check db connecction
db.once('open', () => console.log(`Connected to db ${config.database}`));
db.on('error', (err) => console.log(`Error in connecting to db: ${err}`));

// start express
const app = express();

// cors middleware
app.use(cors());

// route files
const main = require('./routes/main');

//routes
app.use('/api/', main);

// start server
let port = 3000;
app.listen(3000, () => console.log(`Server started at ${port}`));