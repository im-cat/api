export default class SequelizeTabooRepository {
  constructor ({taboo}) {
    this.tabooModel = taboo
  }

  findByText (text, option = {}) {
    return this.tabooModel.findOne({where: {text}, ...option})
  }
}
