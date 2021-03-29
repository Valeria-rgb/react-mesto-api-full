const router = require('express').Router();
const {
  getUsers, getProfile, updateProfile, updateAvatar, getMyInfo
} = require('../controllers/users');
const { updateProfileValidator, updateAvatarValidator } = require('../middlewares/validators');

router.get('/users', getUsers);
router.get('/users/me', getMyInfo);
router.get('/users/:userId', getProfile);
router.patch('/users/me', updateProfileValidator, updateProfile);
router.patch('/users/me/avatar', updateAvatarValidator, updateAvatar);

module.exports = router;

