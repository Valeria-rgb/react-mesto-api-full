const router = require('express').Router();
const {
  getCards, postCard, deleteCard, putLike, deleteLike, getError,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', postCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', putLike);
router.delete('/cards/:cardId/likes', deleteLike);

router.all('/*', getError);

module.exports = router;
