const router = require('express').Router();
const {
  getCards, postCard, deleteCard, putLike, deleteLike
} = require('../controllers/cards');
const { postCardValidator } = require('../middlewares/validators');


router.get('/cards', getCards);
router.post('/cards', postCardValidator, postCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', putLike);
router.delete('/cards/:cardId/likes', deleteLike);

module.exports = router;



