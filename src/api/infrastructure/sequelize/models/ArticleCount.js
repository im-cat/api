import {Model, DataTypes} from 'sequelize'

export class ArticleCount extends Model {
}

export default sequelize => {
  return ArticleCount.init(
    {
      articleCountId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      articleId: {
        type: DataTypes.INTEGER(255).UNSIGNED,
        allowNull: false,
        comment: '아티클 번호'
      },
      viewCount: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: '뷰 카운트'
      },
      wishCount: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: '좋아요 카운트'
      }
    }, {
      underscored: true,
      freezeTableName: true,
      tableName: 'article_count',
      name: {singular: 'articleCount', plural: 'articleCount'},
      indexes: [{name: 'idx_article_count_id', fields: ['article_count_id']}],
      sequelize,
    })
}
