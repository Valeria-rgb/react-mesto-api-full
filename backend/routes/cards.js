const router = require('express').Router();
const {
  getCards, postCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');
const {
  postCardValidator, deleteCardValidator, putLikeValidator, deleteLikeValidator,
} = require('../middlewares/validators');

router.get('/cards', getCards);
router.post('/cards', postCardValidator, postCard);
router.delete('/cards/:cardId', deleteCardValidator, deleteCard);
router.put('/cards/:cardId/likes', putLikeValidator, putLike);
router.delete('/cards/:cardId/likes', deleteLikeValidator, deleteLike);

module.exports = router;
