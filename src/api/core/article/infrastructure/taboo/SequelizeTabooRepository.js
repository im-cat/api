import {SequelizeMemberMapper} from './SequelizeTabooMapper'

export default class SequelizeTabooRepository {
  constructor ({taboo}) {
    this.tabooModel = taboo
  }

  async findByText (text) {
    const taboo = await this.tabooModel.findOne({where: {text}})
    if (taboo) {
      return SequelizeMemberMapper.toEntity(taboo)
    }

    return null
  }
}
