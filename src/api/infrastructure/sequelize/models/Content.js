import {Model, DataTypes} from 'sequelize'

export class Content extends Model {
  static associate (models) {
    this.hasOne(models.Member, {sourceKey: 'memberId', foreignKey: 'memberId', constraints: false})
  }
}

export default sequelize => {
  return Content.init(
    {
      contentId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      articleId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        allowNull: false,
        comment: '아티클 아이디'
      },
      memberId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        allowNull: false,
        comment: '멤버 아이디'
      },
      parentContentId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: '부모 컨텐츠 아이디'
      },
      content: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: '내용'
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
      tableName: 'content',
      name: {singular: 'content', plural: 'content'},
      indexes: [{name: 'idx_content_id', fields: ['content_id']}],
      sequelize,
    })
}
