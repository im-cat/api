import messages from '../../../../common/messages/message'

export class MemberNicknameDuplicateException {
  constructor () {
    const error = new Error('ValidationError')
    error.code = messages.E009.code
    error.details = messages.E009.detail

    throw error
  }
}
