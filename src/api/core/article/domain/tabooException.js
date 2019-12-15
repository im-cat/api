export class TabooException extends Error {
  constructor () {
    super('taboo word in the text');
  }
}
