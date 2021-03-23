const UserModel = require('../models/user');

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

const createProfile = (req, res) => {
  const { name, about, avatar } = req.body;
  UserModel.create({ name, about, avatar })
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

module.exports = {
  getUsers, getProfile, updateProfile, updateAvatar, createProfile,
};
