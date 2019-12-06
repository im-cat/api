import {Model, DataTypes} from 'sequelize'

export class Tag extends Model {
}

export default sequelize => {
  return Tag.init(
    {
      tagId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      text: {
        type: DataTypes.INTEGER(255).UNSIGNED,
        allowNull: false,
        comment: '태그명'
      },
      taggedCount: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        comment: '태깅 횟수'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '생성 날짜'
      }
    }, {
      timestamps: true,
      createdAt: 'createdAt',
      underscored: true,
      freezeTableName: true,
      tableName: 'tag',
      name: {singular: 'tag', plural: 'tag'},
      indexes: [{name: 'idx_tag_id', fields: ['tag_id']}],
      sequelize,
    })
}
