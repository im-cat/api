import messages from '../../../../common/messages/message'

export class TagCreationException {
  constructor () {
    const error = new Error('ValidationError')
    error.code = messages.E005.code
    error.details = messages.E005.detail

    throw error
  }
}
