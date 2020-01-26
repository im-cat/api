import {Model, DataTypes} from 'sequelize'

export class Taboo extends Model {
}

export default sequelize => {
  return Taboo.init(
    {
      tabooId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      text: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '금기어'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '생성 날짜'
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
    }, {
      timestamps: true,
      paranoid: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
      underscored: true,
      freezeTableName: true,
      tableName: 'taboo',
      name: {singular: 'taboo', plural: 'taboo'},
      indexes: [{name: 'idx_taboo_id', fields: ['taboo_id']}],
      sequelize,
    })
}
