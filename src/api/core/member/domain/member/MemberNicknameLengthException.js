import messages from '../../../../common/messages/message'

export class MemberNicknameLengthException {
  constructor () {
    const error = new Error('ValidationError')
    error.code = messages.E008.code
    error.details = messages.E008.detail

    throw error
  }
}
