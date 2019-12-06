import {Taboo} from '../models'

export class TabooDao {

  findByText (text, option = {}) {
    return Taboo.findOne({where: {text}, ...option})
  }
}
