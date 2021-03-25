const router = require('express').Router();
const {
  getUsers, getProfile, updateProfile, updateAvatar, getMyInfo
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/users', auth, getUsers);
router.get('/users/:userId', auth, getProfile);
router.get('/users/me', auth, getMyInfo);
router.patch('/users/me', auth, updateProfile);
router.patch('/users/me/avatar', auth, updateAvatar);

module.exports = router;

