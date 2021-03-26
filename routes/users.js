const router = require('express').Router();
const {
  getUsers, getProfile, updateProfile, updateAvatar, getMyInfo
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getMyInfo);
router.get('/users/:userId', getProfile);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;

