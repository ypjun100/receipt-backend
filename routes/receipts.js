const { Router } = require('express');

const controller = require('../controllers/receipts');

const router = Router();

router.post('/', controller.createReceipt);
router.get('/list', controller.getReceiptProgressList);
router.get('/history', controller.getReceiptFinishList);
router.get('/:id', controller.getReceiptProgress);
router.put('/:id', controller.updateReceiptProgress);
router.delete('/:id', controller.deleteReceiptProgress);
router.get('/history/:id', controller.getReceiptFinish);
router.post('/history', controller.createReceiptFinish);
router.put('/history/:id', controller.udpateReceiptFinish);

module.exports = router;