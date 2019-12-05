const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const clubRouter = require('./routes/club');

const admin = require('firebase-admin');

require('firebase/firestore');

const serviceAccount = require('../serviceaccount.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/club', clubRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// resolve CORS
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization, Content-Length, X-Requested-With, Accept, Origin'
	);
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, PATCH, DELETE');
	next();
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send('error');
});

module.exports = app;
