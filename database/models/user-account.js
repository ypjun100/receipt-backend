const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class UserAccount extends Model {  }

  UserAccount.init({
    account_bank: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    account_number: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    account_owner: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    account_user_id: {
        type: DataTypes.INTEGER(8),
        allowNull: false
    }
  }, {
    modelName: 'user_account',
    timestamps: false,        // createdAt, updatedAt 필드 자동 추가 안함
    freezeTableName: true,    // 모델 이름을 그대로 테이블 이름으로 사용
    sequelize,
  });

  return UserAccount;
}