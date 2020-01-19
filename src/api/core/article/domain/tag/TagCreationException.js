export class TagCreationException {
  constructor () {
    const error = new Error('ValidationError')
    error.details = 'Tag Length Exceeded'

    throw error
  }
}


