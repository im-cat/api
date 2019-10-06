import {Model, DataTypes} from 'sequelize'

export class User extends Model {

}

export default sequelize => {
  User.init(
    {
      id: {
        type: DataTypes.BIGINT({length: 20, unsigned: true}),
        primaryKey: true, autoIncrement: true,
      },
      userId: {type: DataTypes.STRING(255), comment: '사용자 아이디'},
      service: {type: DataTypes.STRING(40), comment: '로그인 서비스'},
      nickname: {type: DataTypes.STRING(40), defaultValue: '', comment: '사용자 닉네임'},
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      timestamps: true,
      paranoid: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      underscored: true,
      freezeTableName: true,
      tableName: 'user',
      name: {singular: 'user', plural: 'user'},
      indexes: [
        {name: 'idx_user_id', fields: ['user_id']},
      ],
      sequelize,
    },
  )

  return User
}
