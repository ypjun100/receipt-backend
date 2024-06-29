const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class ReceiptProgress extends Model {
    static associate(models) {
        ReceiptProgress.hasOne(models.user_account, { as: 'user_account', foreignKey: 'id', sourceKey: 'receipt_account_id'});
    }
  }

  ReceiptProgress.init({
    receipt_name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    receipt_date: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    receipt_price: {
        type: DataTypes.INTEGER(7),
        allowNull: false
    },
    receipt_people: {
        type: DataTypes.INTEGER(3),
        allowNull: false
    },
    receipt_finish_people_names: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    receipt_not_finish_people_names: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    receipt_user_id: {
        type: DataTypes.INTEGER(8),
        allowNull: false
    },
    receipt_account_id: {
        type: DataTypes.INTEGER(8),
        allowNull: false
    }
  }, {
    modelName: 'receipt_progress',
    timestamps: false,        // createdAt, updatedAt 필드 자동 추가 안함
    freezeTableName: true,    // 모델 이름을 그대로 테이블 이름으로 사용
    sequelize,
  });

  return ReceiptProgress;
}