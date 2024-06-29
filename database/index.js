const { Sequelize } = require('sequelize');
const config = require('../config/sequelize');

// 모델 임포트
const userModel = require('./models/user');
const userAccountModel = require('./models/user-account');
const receiptProgressModel = require('./models/receipt-progress');
const receiptFinishModel = require('./models/receipt-finish');

// 설정 불러오기
const env = process.env.NODE_ENV;

const sequelizeConfig = env == 'development' ? config.development : env == 'test' ? config.test : config.production;

// sequelize 인스턴스 생성
const sequelize = new Sequelize(sequelizeConfig);

// 임포트 할 모델 정의
const modelDefiners = [
  userModel,
  userAccountModel,
  receiptProgressModel,
  receiptFinishModel
];

// 초기화
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// 연결 관계 정의
Object.keys(sequelize.models)
  .forEach((modelName) => {
    if (sequelize.models[modelName].associate) {
      sequelize.models[modelName].associate(sequelize.models);
    }
  });

module.exports = sequelize;