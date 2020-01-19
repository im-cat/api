export class TabooException {
  constructor (text) {
    const error = new Error('ValidationError')
    error.details = `${text}는 금기어 입니다.`

    throw error
  }
}
