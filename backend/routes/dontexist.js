const NotFoundError = require('../errors/not-found-err');
const router = require('express').Router();

router.all('*', (req, res) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;