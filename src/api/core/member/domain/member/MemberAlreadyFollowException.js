import messages from '../../../../common/messages/message'

export class MemberAlreadyFollowException {
  constructor () {
    const error = new Error('ValidationError')
    error.code = messages.E012.code
    error.details = messages.E012.detail

    throw error
  }
}
