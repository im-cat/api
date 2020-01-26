import messages from '../../../../common/messages/message'

export class MemberCannotUnFollowException {
  constructor () {
    const error = new Error('ValidationError')
    error.code = messages.E013.code
    error.details = messages.E013.detail

    throw error
  }
}
