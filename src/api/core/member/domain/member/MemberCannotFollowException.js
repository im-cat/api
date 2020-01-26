import messages from '../../../../common/messages/message'

export class MemberCannotFollowException {
  constructor () {
    const error = new Error('ValidationError')
    error.code = messages.E011.code
    error.details = messages.E011.detail

    throw error
  }
}
