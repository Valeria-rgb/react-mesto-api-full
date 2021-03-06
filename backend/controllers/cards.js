const CardModel = require('../models/card');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const getCards = (req, res, next) => {
  CardModel.find({})
    // .populate('owner', 'likes')
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  CardModel.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные!');
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  CardModel.findById(req.params.cardId)
    // .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с данным id не найдена');
      } else if (card.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Нет! Вы не можете удалять карточки других пользователей');
      } else {
        CardModel.findByIdAndDelete(req.params.cardId)
          .then(() => res.send({ message: 'Карточка удалена успешно!' }));
      }
    })
    .catch(next);
};

const putLike = (req, res, next) => {
  const { cardId } = req.params;
  CardModel.findByIdAndUpdate(cardId, {
    $addToSet: {
      likes: req.user._id,
    },
  }, {
    new: true,
  })
    // .populate(['likes', 'owner'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с данным id не найдена');
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные!');
      } else {
        next(err);
      }
    });
};

const deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  CardModel.findByIdAndUpdate(cardId, {
    $pull: {
      likes: req.user._id,
    },
  }, {
    new: true,
  })
    // .populate(['likes', 'owner'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с данным id не найдена');
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные!');
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards, postCard, deleteCard, putLike, deleteLike,
};
