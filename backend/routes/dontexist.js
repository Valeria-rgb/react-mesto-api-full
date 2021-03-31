const router = require('express').Router();
const { NotFoundError } = require('../errors/not-found-err');

router.all('*', () => {
  NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
