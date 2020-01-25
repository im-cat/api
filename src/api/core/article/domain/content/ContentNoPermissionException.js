import messages from '../../../../common/messages/message'

export class ContentNoPermissionException {
  constructor () {
    const error = new Error('ValidationError')
    error.code = messages.E007.code
    error.details = messages.E007.detail

    throw error
  }
}
