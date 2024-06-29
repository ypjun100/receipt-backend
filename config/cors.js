require('dotenv').config();

// cors 설정

module.exports = {
    credentials: true,                          // 다른 도메인 요청 시 인증 정보 요청 허가
    origin: process.env.CORS_ALLOWED_ORIGIN     // 도메인 설정
};