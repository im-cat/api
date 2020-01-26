import messages from '../../../../common/messages/message'

export class ArticleFinishConditionExceedException {
  constructor () {
    const error = new Error('ValidationError')
    error.code = messages.E001.code
    error.details = messages.E001.detail

    throw error
  }
}
