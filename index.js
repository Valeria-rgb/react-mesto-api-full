require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { createUser, login } = require('./controllers/users');

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
