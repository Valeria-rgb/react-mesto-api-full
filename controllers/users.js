const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = (req, res) => {
  UserModel.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера!' }));
};

const getProfile = (req, res) => {
  const { userId } = req.params;
  UserModel.findById(userId)
    .orFail(() => {
      const err = new Error('Профайл не найден!');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(400).send({ message: 'Переданы некорректные данные!' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: 'Пользователь с данным id не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера!' });
      }
    });
};

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => UserModel.create({
      email: req.body.email,
      password: hash,
      avatar: req.body.avatar,
      about: req.body.about,
      name: req.body.name
    }))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные!' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера!' });
      }
    });
};


const updateProfile = (req, res) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  UserModel.findByIdAndUpdate({ _id }, { name, about }, {
    runValidators: true,
    new: true,
  })
    .orFail(() => {
      const err = new Error('Профайл не найден!');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные!' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: 'Пользователь с данным id не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера!' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  UserModel.findByIdAndUpdate({ _id }, { avatar }, {
    runValidators: true,
    new: true,
  })
    .orFail(() => {
      const err = new Error('Профайл не найден!');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные!' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: 'Пользователь с данным id не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера!' });
      }
    });
};


const login = (req, res) => {
  const { email, password } = req.body;
   return UserModel.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true
        })
        .end();
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports = {
  getUsers, getProfile, updateProfile, updateAvatar, createUser, login
};
