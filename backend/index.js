require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { signupValidator, signinValidator } = require('./middlewares/validators');
const { NotFoundError } = require('./errors/not-found-err');

const app = express();

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
// const dontExistRouter = require('./routes/dontexist');

const options = {
  origin: [
    'http://localhost:3000',
    'https://api.valeria-rgb.students.nomoreparties.icu',
    'https://valeria-rgb.students.nomoreparties.icu',
    'http://api.valeria-rgb.students.nomoreparties.icu',
    'http://valeria-rgb.students.nomoreparties.icu',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', signinValidator, login);
app.post('/signup', signupValidator, createUser);

app.use('/', auth, usersRouter);
app.use('/', auth, cardsRouter);
app.use('*', () => throw new NotFoundError('Запрашиваемый ресурс не найден'));

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
