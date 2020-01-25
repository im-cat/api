import {Model, DataTypes} from 'sequelize'

export class Report extends Model {
}

export default sequelize => {
  return Report.init(
    {
      reportId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      memberId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        allowNull: false,
      },
      articleId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        allowNull: false,
      },
      contentId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '신고 내용'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
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
      tableName: 'report',
      name: {singular: 'report', plural: 'report'},
      sequelize,
    })
}
