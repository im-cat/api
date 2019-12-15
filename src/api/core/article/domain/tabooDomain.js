export class TabooDomain {
  constructor (dao) {
    this.dao = dao
  }

  async isExistTaboo (text) {
    let tabooInfo = []

    if (typeof text === 'string') {
      text = text.split(' ')
    }

    for (const item of text) {
      const taboo = await this.dao.findByText(item, {raw: true})
      taboo ? tabooInfo.push(true) : tabooInfo.push(false)
    }

    if (tabooInfo.includes(true)) {
      return true
    }

    return false
  }
}
