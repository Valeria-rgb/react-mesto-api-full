const CardModel = require('../models/card');

const getCards = (req, res) => {
  CardModel.find({})
    .populate('owner')
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера!' }));
};
const postCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  CardModel.create({ name, link, owner: _id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные!' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера!' });
      }
    });
};

// если писать в if return - не проходит eslint

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  CardModel.findByIdAndRemove(cardId, req.body)
    .populate('owner')
    .orFail(() => {
      const err = new Error('Карточка не найдена!');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные!' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: 'Карточка с данным id не найдена' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера!' });
      }
    });
};

const putLike = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  CardModel.findByIdAndUpdate(cardId, {
    $addToSet: {
      likes: _id,
    },
  }, {
    new: true,
  })
    .populate(['likes', 'owner'])
    .orFail(() => {
      const err = new Error('Карточка не найдена!');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные!' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: 'Карточка с данным id не найдена' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера!' });
      }
    });
};

const deleteLike = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  CardModel.findByIdAndUpdate(cardId, {
    $pull: {
      likes: _id,
    },
  }, {
    new: true,
  })
    .populate(['likes', 'owner'])
    .orFail(() => {
      const err = new Error('Карточка не найдена!');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные!' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: 'Карточка с данным id не найдена' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера!' });
      }
    });
};

const getError = (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });

module.exports = {
  getCards, postCard, deleteCard, putLike, deleteLike, getError,
};
