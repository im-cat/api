export class TabooDomain {
  constructor (dao) {
    this.dao = dao
  }

  async isExistTaboo (text) {
    const tabooInfo = await this.dao.findByText(text, {raw: true})

    if (tabooInfo) {
      return true
    }

    return false
  }
}
