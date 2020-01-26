import {Model, DataTypes} from 'sequelize'

export class Follow extends Model {
}

export default sequelize => {
  return Follow.init(
    {
      followId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      followerId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        allowNull: false,
      },
      followingId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
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
      tableName: 'follow',
      name: {singular: 'follow', plural: 'follow'},
      sequelize,
    })
}
