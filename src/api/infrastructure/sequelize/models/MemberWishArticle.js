import {Model, DataTypes} from 'sequelize'

export class MemberWishArticle extends Model {
}

export default sequelize => {
  return MemberWishArticle.init(
    {
      memberWishArticleId: {
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
      createdAt: {type: DataTypes.DATE, allowNull: false},
      updatedAt: {type: DataTypes.DATE, allowNull: false},
      deletedAt: {type: DataTypes.DATE, allowNull: true},
    },
    {
      timestamps: true,
      paranoid: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
      underscored: true,
      freezeTableName: true,
      tableName: 'member_wish_article',
      name: {singular: 'memberWishArticle', plural: 'memberWishArticle'},
      sequelize,
    },
  )
}
