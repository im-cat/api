import messages from '../../../../common/messages/message'

export class ContentLengthExceedException {
  constructor () {
    const error = new Error('ValidationError')
    error.code = messages.E002.code
    error.details = messages.E002.detail

    throw error
  }
}
