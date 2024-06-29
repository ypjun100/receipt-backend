const homeRouter = require('../routes/home');
const userRouter = require('../routes/user');
const sessionRouter = require('../routes/session');
const receiptRouter = require('../routes/receipt');
const receiptsRouter = require('../routes/receipts');
const accountsRouter = require('../routes/accounts');

const URL_PREFIX = '/receipt';

module.exports = (app) => {
    app.use(URL_PREFIX, homeRouter);
    app.use(URL_PREFIX + '/user', userRouter);
    app.use(URL_PREFIX + '/session', sessionRouter);
    app.use(URL_PREFIX + '/receipt', receiptRouter);
    app.use(URL_PREFIX + '/receipts', receiptsRouter);
    app.use(URL_PREFIX + '/accounts', accountsRouter);
}