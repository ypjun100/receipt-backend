const { Router } = require('express');

const controller = require('../controllers/home');

const router = Router();

router.get('/', controller.index);
router.post('/', controller.getReceiptProgress);

module.exports = router;