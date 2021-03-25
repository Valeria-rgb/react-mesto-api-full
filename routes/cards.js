const router = require('express').Router();
const {
  getCards, postCard, deleteCard, putLike, deleteLike, getError,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');

router.get('/cards', auth, getCards);
router.post('/cards', auth, postCard);
router.delete('/cards/:cardId', auth, deleteCard);
router.put('/cards/:cardId/likes', auth, putLike);
router.delete('/cards/:cardId/likes', auth, deleteLike);

router.all('/*', getError);

module.exports = router;
