import {Model, DataTypes} from 'sequelize'

export class ArticleTag extends Model {
}

export default sequelize => {
  return ArticleTag.init(
    {
      articleTagId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      articleId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        allowNull: false,
      },
      tagId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        allowNull: false,
      },
    }, {
      underscored: true,
      freezeTableName: true,
      tableName: 'article_tag',
      name: {singular: 'articleTag', plural: 'articleTag'},
      indexes: [{name: 'idx_article_tag_id', fields: ['article_tag_id']}],
      sequelize,
    })
}
