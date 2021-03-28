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
        res.status(200).send(user);
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
  UserModel.findByIdAndUpdate(req.user._id, {$set: {name, about}}, {
    runValidators: true,
    new: true
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с данным id не найден');
      } else {
        res.status(200).send({user});
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
  UserModel.findByIdAndUpdate(req.user._id, {$set: {avatar}}, {
    // runValidators: true,
    // new: true
  })
    .then((user) => {
      return Promise.reject(new Error("avatar is - " + avatar));
      if (!user) {
        throw new NotFoundError('Пользователь с данным id не найден');
      } else {
        res.status(200).send(user);
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

const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email}).select('+password');
    if (!user) {
      next(new UnauthorizedError('Неправильный почта/пароль'));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      next(new UnauthorizedError('Неправильный почта/пароль'));
    } else {
      const token = jwt.sign(
        {_id: user._id},
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        {expiresIn: '7d'},
      );
      return res.send({token});
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers, getProfile, updateProfile, updateAvatar, createUser, login, getMyInfo
};
