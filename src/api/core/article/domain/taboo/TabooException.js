import messages from '../../../../common/messages/message'

export class TabooException {
  constructor () {
    const error = new Error('ValidationError')
    error.code = messages.E004.code
    error.details = messages.E004.detail

    throw error
  }
}
