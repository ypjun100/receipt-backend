const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.user_account, { as: 'user_account', foreignKey: 'account_user_id', sourceKey: 'id'});
      User.hasMany(models.receipt_progress, { as: 'receipt_progress', foreignKey: 'receipt_user_id', sourceKey: 'id'});
      User.hasMany(models.receipt_finish, { as: 'receipt_finish', foreignKey: 'receipt_user_id', sourceKey: 'id'});
    }
  }

  User.init({
    user_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    user_password: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
  }, {
    modelName: 'user',
    timestamps: false,        // createdAt, updatedAt 필드 자동 추가 안함
    freezeTableName: true,    // 모델 이름을 그대로 테이블 이름으로 사용
    sequelize,
  });

  return User;
}