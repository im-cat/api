import messages from '../../../../common/messages/message'

export class MemberIsDisabledException {
  constructor () {
    const error = new Error('ValidationError')
    error.code = messages.E010.code
    error.details = messages.E010.detail

    throw error
  }
}
