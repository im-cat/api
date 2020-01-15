import {Model, DataTypes, Sequelize} from 'sequelize'

export class MemberToken extends Model {
}

export default sequelize => {
  return MemberToken.init(
    {
      memberTokenId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      memberId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        allowNull: false,
      },
      accessToken: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: '사용자 토큰'
      },
      expireAt: {type: DataTypes.DATE, allowNull: false},
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
      tableName: 'member_token',
      name: {singular: 'memberToken', plural: 'memberToken'},
      indexes: [{name: 'idx_member_token_id', fields: ['member_token_id']}],
      sequelize,
    },
  )
}

export const getAccessToken = (accessToken) =>
  MemberToken.findOne({
      where: {
        accessToken,
        expireAt: {[Sequelize.Op.gt]: new Date()}
      }, raw: true
    }
  )
