require('dotenv').config();

const { NODE_ENV } = process.env;

const cors = require('cors');
const logger = require('morgan');
const express = require('express');
const compression = require('compression');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

const path = require('path');
const configs = require('./config');
const { sessionMiddleware }  = require('./middleware');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 기본 미들웨어 연결
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(configs.corsConfig));
app.use(compression(configs.compressionConfig));
app.use(cookieParser());

// 세션 미들웨어 연결
if (NODE_ENV != 'test')
  app.use(sessionMiddleware());

// 라우터 연결
configs.routerConfig(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json(err);
});

module.exports = app;
