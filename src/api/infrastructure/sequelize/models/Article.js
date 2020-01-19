import {Model, DataTypes} from 'sequelize'

export class Article extends Model {
}

export default sequelize => {
  return Article.init(
    {
      articleId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      memberId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '제목'
      },
      mainText: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '본문'
      },
      letterNumber: {
        type: DataTypes.INTEGER(5).UNSIGNED,
        defaultValue: 50,
        allowNull: false,
        comment: '글자수'
      },
      finishCondition: {
        type: DataTypes.INTEGER(5).UNSIGNED,
        defaultValue: 50,
        allowNull: false,
        comment: '글 완료 조건'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
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
      tableName: 'article',
      name: {singular: 'article', plural: 'article'},
      indexes: [{name: 'idx_article_id', fields: ['article_id']}],
      sequelize,
    })
}
