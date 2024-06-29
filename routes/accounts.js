const { Router } = require('express');

const controller = require('../controllers/accounts');

const router = Router();

router.get('/', controller.getAccounts);
router.post('/', controller.createAccounts);
router.put('/', controller.updateAccounts);
router.delete('/:id', controller.deleteAccounts);

module.exports = router;