const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {connectDB, getDb} = require('./config/db');
const buildRouter = require('./routes/build');
const cors = require('cors');

const app = express();
app.use(cors());
connectDB();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/build', buildRouter);



module.exports = app;
