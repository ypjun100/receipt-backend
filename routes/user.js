const { Router } = require('express');

const controller = require('../controllers/user');

const router = Router();

router.post('/signup', controller.signup);
router.get('/info', controller.getUserInfo);
router.put('/info', controller.updateUserInfo);

module.exports = router;