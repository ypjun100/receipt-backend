const db = require('../database');

/**
 * POST /session/log-in
 * 로그인 및 세션 등록
 * - ERR_CODE(1) : 이미 접속되어 있는 세션 존재
 * - ERR_CODE(2) : 비밀번호 미일치
 */
const login = (req, res) => {
    const user_id = req.body.user_id;
    const user_password_inc = req.body.user_password_inc;

    db.models.user.findAll({
        attributes: ['id', 'user_password'],
        where: {'user_id': user_id}
    }).then(result => {
        if(result[0]) {
            if(result[0].user_password === user_password_inc) {
                if(req.session.session_id) {
                   res.json({status: false, err_code: 0});
                } else {
                    req.session._id = result[0].id;
                    req.session.user_id = user_id;
                    res.json({status: true});
                }
            } else {
                res.json({status: false, err_code: 1});
            }
        }
        else
            res.json({status: false});
    });
};

/**
 * POST /session/log-out
 * 로그아웃 및 세션 삭제
 * - ERR_CODE(0) : 세션 삭제 실패
 * - ERR_CODE(1) : 이미 세션이 없는 상태
 */
const logout = (req, res) => {
    if (req.session.user_id) { // 세션 확인
        req.session.destroy(err => {
            if(err) {
                res.json({status: false, err_code: 0});
            } else {
                res.json({status: true});
            }
        });
    } else { // 세션 확인 실패
        res.json({status: false, err_code: 1});
    }
};

module.exports = {
    login,
    logout
}