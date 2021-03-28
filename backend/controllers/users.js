const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {NODE_ENV, JWT_SECRET} = process.env;

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const getUsers = (req, res, next) => {
  UserModel.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getMyInfo = (req, res, next) => {
  const id = req.user._id;
  UserModel.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с данным id не найден');
      } else {
        res.status(200).send({data: user});
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные!');
      } else {
        next(err);
      }
    });
};

const getProfile = (req, res, next) => {
  const {userId} = req.params;
  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с данным id не найден');
      } else {
        res.status(200).send({data: user});
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные!');
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {email, password, name, about, avatar} = req.body;
  UserModel.findOne({
    email,
  })
    .then((data) => {
      if (data) {
        throw new ConflictError('Пользователь с таким email уже существует!');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => UserModel.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(200).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные!');
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
  const {name, about} = req.body;
  UserModel.findByIdAndUpdate(req.user._id, {name, about}, {
    runValidators: true,
    new: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с данным id не найден');
      } else {
        res.status(200).send({data: user});
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные!');
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const {avatar} = req.body;
  UserModel.findByIdAndUpdate(req.user._id, {avatar}, {
    runValidators: true,
    new: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с данным id не найден');
      } else {
        res.status(200).send({data: user});
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные!');
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const {email, password} = req.body;
  return UserModel.findUserByCredentials(email, password)
    .catch(() => {
      throw new UnauthorizedError('Требуется авторизация!');
    })
    .then((user) => {
      const token = jwt.sign(
        {_id: user._id},
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        {expiresIn: '7d'});
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true
        })
        .end();
    })
    .catch(next);
};

module.exports = {
  getUsers, getProfile, updateProfile, updateAvatar, createUser, login, getMyInfo
};
