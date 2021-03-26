require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger} = require('./middlewares/logger')
const { signupValidator, signinValidator } = require('./middlewares/validators')
const { errors } = require('celebrate');
const cors = require('cors');

const app = express();
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const PORT = 3000;
const options = {
  origin: [
    'http://localhost:8080',
    'http://api.valeria-rgb.students.nomoredomains.icu/',    'http://valeria-rgb.students.nomoredomains.icu/',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],  preflightContinue: false,  optionsSuccessStatus: 204,  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],  credentials: true,};
app.use('*', cors(options));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://valeria-rgb.students.nomoredomains.icu');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');

  next();
});

app.post('/signin', signinValidator, login);
app.post('/signup',signupValidator, createUser);

app.use('/', auth, usersRouter);
app.use('/', auth, cardsRouter);

app.use(errorLogger);

app.use(errors());


app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'Ошибка сервера!' : message });

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
