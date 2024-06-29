const db = require('../database');

/**
 * GET /
 * API 홈 화면
 */
const index = (req, res) => {
    res.render('404');
};

/**
 * POST /
 * 사용자의 receipt_progress 내역 반환
 */
const getReceiptProgress = (req, res) => {
    if (req.session.user_id) { // 세션 확인
        db.models.user.findAll({
            attributes: ['id', 'user_name'],
            where: {'user_id': req.session.user_id},
            include: [{model: db.models.receipt_progress, attributes: ['id', 'receipt_name', 'receipt_date'], as: 'receipt_progress', limit: 2, order: [['id', 'DESC']]}]
        }).then(result => {
            if(result[0])
                res.json({status: true, id: result[0].id, user_name: result[0].user_name, receipt_progress: result[0].receipt_progress});
            else
                res.json({status: false});
        });
    } else { // 세션 확인 실패
        res.render('404');
    }
};

module.exports = {
    index,
    getReceiptProgress
};