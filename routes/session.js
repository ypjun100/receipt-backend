const { Router } = require('express');

const controller = require('../controllers/session');

const router = Router();

router.post('/log-in', controller.login);
router.post('/log-out', controller.logout);

module.exports = router;