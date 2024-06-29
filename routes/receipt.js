const { Router } = require('express');

const controller = require('../controllers/receipt');

const router = Router();

router.get('/history/:id', controller.getReceiptFinish);
router.get('/:id', controller.getReceiptProgress);

module.exports = router;