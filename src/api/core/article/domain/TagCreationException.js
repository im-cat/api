export class TagCreationException extends Error {
  constructor () {
    super('Tag Length Exceeded')
  }
}

