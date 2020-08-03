const express = require('express');
const userRouter = require('./routers/users');
const questionRouter = require('./routers/question');
const resultRouter = require('./routers/result');
const recordsRouter = require('./routers/records');
const app = express();

//Middleware
app.use(express.json());
//CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
	next();
});

app.use('/api/users', userRouter);
app.use('/api/questions', questionRouter);
app.use('/api/results', resultRouter);
app.use('/api/records', recordsRouter);
module.exports = app;
