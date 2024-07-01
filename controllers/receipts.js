const db = require('../database');

/**
 * POST /receipts/
 * receipt 등록
 */
const createReceipt = (req, res) => {
    if (req.session.user_id) { // 세션 확인
        const tmp_cur_date = new Date();

        const { receipt_name, receipt_price, receipt_people, user_account } = req.body;
        const receipt_date = `${tmp_cur_date.getFullYear()}-${("0" + (tmp_cur_date.getMonth()+1).toString()).slice(-2)}-${("0" + tmp_cur_date.getDate().toString()).slice(-2)}`;
        const receipt_not_finish_people_names = '홍길동&and;'.repeat(receipt_people);
        const receipt_user_id = req.session._id;
        const receipt_account_id = user_account.account_id;

        db.models.receipt_progress.create({
            receipt_name: receipt_name,
            receipt_date: receipt_date,
            receipt_price: receipt_price,
            receipt_people: receipt_people,
            receipt_finish_people_names: '',
            receipt_not_finish_people_names: receipt_not_finish_people_names,
            receipt_user_id: receipt_user_id,
            receipt_account_id: receipt_account_id
        }).then(result => {
            if(result.id)
                res.json({status: true});
        });
    } else { // 세션 확인 실패
        res.render('404');
    }
};

/**
 * GET /receipts/list
 * 해당 유저의 receipt_progress 반환
 */
const getReceiptProgressList = (req, res) => {
    if (req.session.user_id) { // 세션 확인
        db.models.user.findAll({
            attributes: ['id', 'user_name'],
            where: {'user_id': req.session.user_id},
            include: [{model: db.models.receipt_progress, attributes: ['id', 'receipt_name', 'receipt_date'], as: 'receipt_progress'}],
            order: [[db.models.receipt_progress, 'id', 'DESC']]
        }).then(result => {
            res.json({status: true, receipt_progress: result[0].receipt_progress});
        });
    } else { // 세션 확인 실패
        res.render('404');
    }
};

/**
 * GET /receipts/history
 * 해당 유저의 receipt_finish 반환
 */
const getReceiptFinishList = (req, res) => {
    if (req.session.user_id) { // 세션 확인
        db.models.user.findAll({
            attributes: ['id', 'user_name'],
            where: {'user_id': req.session.user_id},
            include: [{model: db.models.receipt_finish, attributes: ['id', 'receipt_name', 'receipt_date'], as: 'receipt_finish'}],
            order: [[db.models.receipt_finish, 'id', 'DESC']]
        }).then(result => {
            res.json({status: true, receipt_finish: result[0].receipt_finish});
        });
    } else { // 세션 확인 실패
        res.render('404');
    }
};

/**
 * GET /receipts/:id
 * 유저의 계좌 정보와 함께 receipt_progress 반환
 */
const getReceiptProgress = (req, res) => {
    if (req.session.user_id) { // 세션 확인
        const id = req.params.id;

        db.models.receipt_progress.findAll({
            attributes: ['receipt_name', 'receipt_date', 'receipt_price', 'receipt_people', 'receipt_finish_people_names', 'receipt_not_finish_people_names'],
            where: {'id': id},
            include: [{model: db.models.user_account, attributes: ['account_bank', 'account_number', 'account_owner'], as: 'user_account'}]
        }).then(result => {
            if(result[0])
                res.json({status: true, receipt_data: result[0]});
            else
                res.json({status: false});
        }).catch(() => {
            res.json({status: false});
        });
    } else { // 세션 확인 실패
        res.render('404');
    }
};

/**
 * PUT /receipts/:id
 * 특정 id를 가진 receipt_progress 수정
 */
const updateReceiptProgress = (req, res) => {
    if (req.session.user_id) { // 세션 확인
        const id = req.params.id;
        const set = req.body.set;

        db.models.receipt_progress.update(set, {where: {'id': id}}
        ).then(() => {
            res.json({status: true});
        }).catch(() => {
            res.json({status: false});
        });
    } else { // 세션 확인 실패
        res.render('404');
    }
};

/**
 * DELETE /receipts/:id
 * 특정 id를 가진 receipt_progress 삭제
 */
const deleteReceiptProgress = (req, res) => {
    if (req.session.user_id) { // 세션 확인
        const id = req.params.id;

        db.models.receipt_progress.destroy({where: {'id': id}}
        ).then(() => {
            res.json({status: true});
        }).catch(() => {
            res.json({status: false});
        }); 
    } else { // 세션 확인 실패
        res.render('404');
    }
};

/**
 * GET /receipts/history/:id
 * 특정 id를 가진 receipt_finish 반환
 */
const getReceiptFinish = (req, res) => {
    if (req.session.user_id) { // 세션 확인
        const id = req.params.id;
        
        db.models.receipt_finish.findAll({
            attributes: ['receipt_name', 'receipt_date', 'receipt_price', 'receipt_people', 'receipt_finish_people_names'],
            where: {'id': id},
            include: [{model: db.models.user_account, attributes: ['account_bank', 'account_number', 'account_owner'], as: 'user_account'}]
        }).then(result => {
            if(result[0])
                res.json({status: true, receipt_data: result[0]});
            else
                res.json({status: false});
        }).catch(() => {
            res.json({status: false});
        });
    } else { // 세션 확인 실패
        res.render('404');
    }
};

/**
 * POST /receipts/history
 * 특정 id를 가진 receipt_progress 데이터를 receipt_finish로 이관
 */
const createReceiptFinish = (req, res) => {
    if (req.session.user_id) { // 세션 확인
        const { receipt_id, receipt_progress_id } = req.body;

        db.models.receipt_progress.findAll({
            attributes: ['receipt_name', 'receipt_date', 'receipt_price', 'receipt_people', 'receipt_finish_people_names', 'receipt_not_finish_people_names', 'receipt_user_id', 'receipt_account_id'],
            where: {'id': receipt_id}
        }).then(result => {
            const receipt_progress_data = result[0];
            db.models.receipt_finish.create({
                receipt_name: receipt_progress_data.receipt_name,
                receipt_date: receipt_progress_data.receipt_date,
                receipt_price: receipt_progress_data.receipt_price,
                receipt_people: receipt_progress_data.receipt_people,
                receipt_finish_people_names: receipt_progress_data.receipt_finish_people_names,
                receipt_user_id: receipt_progress_data.receipt_user_id,
                receipt_account_id: receipt_progress_data.receipt_account_id,
                receipt_progress_id: receipt_progress_id
            }).then(() => {
                res.json({status: true});
            }).catch(() => {
                res.json({status: false});
            });
        }).catch((err) => {
            res.json({status: false});
            console.log(err);
        });
    } else { // 세션 확인 실패
        res.render('404');
    }
};

/**
 * PUT /history/:id
 * 특정 id를 가진 receipt_finish 수정
 */
const udpateReceiptFinish = (req, res) => {
    if (req.session.user_id) { // 세션 확인
        const id = req.params.id;
        const set = req.body.set;

        db.models.receipt_finish.update(set, {where: {'id': id}}
        ).then(() => {
            res.json({status: true});
        }).catch(() => {
            res.json({status: false});
        });
    } else { // 세션 확인 실패
        res.render('404');
    }
};

module.exports = {
    createReceipt,
    getReceiptProgressList,
    getReceiptFinishList,
    getReceiptProgress,
    updateReceiptProgress,
    deleteReceiptProgress,
    getReceiptFinish,
    createReceiptFinish,
    udpateReceiptFinish
};