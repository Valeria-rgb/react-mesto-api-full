const router = require('express').Router();
const {
  getUsers, getProfile, updateProfile, updateAvatar
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getProfile);
// router.post('/users', createUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
