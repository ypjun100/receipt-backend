const db = require('../database');

/**
 * POST /user/signup
 * 회원가입
 * - ERR_CODE(0) : 이미 회원 존재
 * - ERR_CODE(1) : 등록 중 문제 발생
 */
const signup = (req, res) => {
    const user_id = req.body.user_id;
    const user_password_inc = req.body.user_password_inc;
    const user_name = req.body.user_name;

    db.models.user.findAll({
        attributes: ['id'],
        where: {'user_id': user_id}
    }).then(result => {
        if(result[0]) {
            res.json({status: false, err_code: 0});
        } else {
            db.models.user.create({
                user_id: user_id,
                user_password: user_password_inc,
                user_name: user_name
            }).then(() => {
                res.json({status: true});
            }).catch(() => {
                res.json({status: false, err_code: 1});
            });
        }
    });
};

/**
 * GET /user/info
 * 유저 정보 반환
 */
const getUserInfo = (req, res) => {
    if (req.session.user_id) { // 세션 확인
        db.models.user.findAll({
            attributes: ['user_name'],
            where: {'user_id': req.session.user_id}
        }).then(result => {
            if(result[0]) {
                res.json({status: true, user_name: result[0].user_name});
            } else
                res.json({status: false});
        }).catch(() => {
            res.json({status: false});
        });
    } else { // 세션 확인 실패
        res.render('404');
    }
};

/**
 * PUT /user/info
 * 유저 정보 수정
 */
const updateUserInfo = (req, res) => {
    if (req.session.user_id) { // 세션 확인
        db.models.user.update({user_name: req.body.user_name}, {where: {'user_id': req.session.user_id}}
        ).then(result => {
            if(result[0])
                res.json({status: true});
            else
                res.json({status: false});
        }).catch(() => {
            res.json({status: false});
        });
    } else { // 세션 확인 실패
        res.render('404');
    }
};

module.exports = {
    signup,
    getUserInfo,
    updateUserInfo
}