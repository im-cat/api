export class ArticleFinishConditionExceedException {
  constructor () {
    const error = new Error('ValidationError')
    error.details = `글 완료 조건을 초과 하였습니다.`

    throw error
  }
}
