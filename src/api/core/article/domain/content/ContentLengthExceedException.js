export class ContentLengthExceedException {
  constructor (num) {
    const error = new Error('ValidationError')
    error.details = `글자 수를 초과하였습니다. 해당 아티클의 가능한 글자 수는 ${num} 입니다.`

    throw error
  }
}
