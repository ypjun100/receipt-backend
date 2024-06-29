const db = require('../database');

/**
 * GET /accounts/
 * 사용자 계좌 목록 불러오기
 */
const getAccounts = (req, res) => {
    if (req.session.user_id) { // 세션 확인
        db.models.user.findAll({ // 조회
            attributes: ['id', 'user_id'],
            where: {'user_id': req.session.user_id},
            include: [{model: db.models.user_account, attributes: ['id', 'account_bank', 'account_number', 'account_owner'], as: 'user_account'}]
        }).then(result => {
            res.json({status: true, user_account: result[0].user_account});
        });
    } else { // 세션 확인 실패
        res.render('404');
    }
};

/**
 * POST /accounts/
 * 사용자 계좌 추가
 */
const createAccounts = (req, res) => {
    if(req.session.user_id) { // 세션 확인
        const { account_bank, account_number, account_owner } = req.body;

        db.models.user.findAll({
            attributes: ['id'],
            where: {'user_id': req.session.user_id}
        }).then(result => {
            if(result[0]) {
                db.models.user_account.create({
                    account_bank: account_bank,
                    account_number: account_number,
                    account_owner: account_owner,
                    account_user_id: result[0].id
                }).then(() => {
                    res.json({status: true});
                }).catch(() => {
                    res.json({status: false});
                })
            } else {
                res.json({status: false});
            }
        });
    } else { // 세션 확인 실패
        res.render('404');
    }
};

/**
 * PUT /accounts/
 * 사용자 계좌 정보 변경
 */
const updateAccounts = (req, res) => {
    if(req.session.user_id) { // 세션 확인
        const { account_id, account_bank, account_number, account_owner } = req.body;

        db.models.user.findAll({
            attributes: ['id'],
            where: {'user_id': req.session.user_id}
        }).then(result => {
            if(result[0]) {
                db.models.user_account.update({
                    account_bank: account_bank,
                    account_number: account_number,
                    account_owner: account_owner
                }, {where: {'id': account_id}}
                ).then(() => {
                    res.json({status: true});
                });
            } else {
                res.json({status: false});
            }
        });
    } else { // 세션 확인 실패
        res.render('404');
    }
}

/**
 * DELETE /accounts/:id
 * 사용자 계좌 삭제
 */
const deleteAccounts = (req, res) => {
    if(req.session.user_id) { // 세션 확인
        const { id } = req.params;

        UserAccount.destroy({
            where: {id: id}
        }).then(() => {
            res.json({status: true});
        }).catch(() => {
            res.json({status: false});
        });
    } else { // 세션 확인 실패
        res.render('404');
    }
}

module.exports = {
    getAccounts,
    createAccounts,
    updateAccounts,
    deleteAccounts
};