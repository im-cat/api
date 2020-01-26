import {Model, DataTypes} from 'sequelize'

export class Member extends Model {
  static associate (models) {
    this.belongsTo(models.Content, {foreignKey: 'memberId', constraints: false})
  }
}

export default sequelize => {
  return Member.init(

    {
      memberId: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      loginId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '사용자 아이디'
      },
      nickname: {
        type: DataTypes.STRING(20),
        defaultValue: '',
        allowNull: false,
        comment: '사용자 닉네임'
      },
      loginService: {
        type: DataTypes.STRING(10),
        allowNull: false,
        comment: '로그인 서비스'
      },
      age: {
        type: DataTypes.TINYINT(3).UNSIGNED,
        allowNull: true,
        comment: '나이'
      },
      gender: {
        type: DataTypes.TINYINT(1).UNSIGNED,
        allowNull: true,
        comment: '성별(0: 남자/1: 여자)'
      },
      icon: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '프로필 이미지'
      },
      role: {
        type: DataTypes.STRING(10),
        defaultValue: 'member',
        allowNull: false,
        comment: '사용자 역할'
      },
      disabled: {
        type: DataTypes.TINYINT(1).UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: '이용 정지 유무(0: false/1: true)'
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
    },
    {
      timestamps: true,
      paranoid: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
      underscored: true,
      freezeTableName: true,
      tableName: 'member',
      name: {singular: 'member', plural: 'member'},
      indexes: [{name: 'idx_member_id', fields: ['member_id']}],
      sequelize,
    },
  )
}
