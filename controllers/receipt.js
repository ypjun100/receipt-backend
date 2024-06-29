const db = require('../database');

/**
 * GET /receipt/history/:id
 * receipt_finish 조회
 */
const getReceiptFinish = (req, res) => {
    const { id } = req.params;

    db.models.receipt_finish.findAll({
        attributes: ['receipt_price', 'receipt_people'],
        where: {'id': id},
        include: [{model: db.models.user_account, attributes: ['account_bank', 'account_number', 'account_owner'], as: 'user_account'}]
    }).then(result => {
        if(result[0])
            res.json({status: true, receipt_data: result[0]});
        else {
            db.models.receipt_finish.findAll({
                attributes: ['receipt_price', 'receipt_people'],
                where: {'receipt_progress_id': id},
                include: [{model: db.models.user_account, attributes: ['account_bank', 'account_number', 'account_owner'], as: 'user_account'}]
            }).then(result => {
                if(result[0])
                    res.json({status: true, receipt_data: result[0]});
                else
                    res.json({status: false});
            }).catch(() => {
                res.json({status: false});
            });
        }
    }).catch(() => {
        res.json({status: false});
    });
};

/**
 * GET /receipt/:id
 * receipt_progress 조회
 */
const getReceiptProgress = (req, res) => {
    const id = req.params.id;

    db.models.receipt_progress.findAll({
        attributes: ['receipt_price', 'receipt_people'],
        where: {'id': id},
        include: [{model: db.models.user_account, attributes: ['account_bank', 'account_number', 'account_owner'], as: 'user_account'}]
    }).then(result => {
        if(result[0])
            res.json({status: true, receipt_data: result[0]});
        else
            res.json({status: false, err_code: 0});
    }).catch(() => {
        res.json({status: false});
    });
};

module.exports = {
    getReceiptFinish,
    getReceiptProgress
};