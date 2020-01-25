import {Article} from '../../../../../src/api/core/article/domain/article/Article'

test('아티클을 생성할 수 있다.', async () => {

  // given
  const articleData = {
    memberId: 1,
    title: '테스트 제목',
    mainText: '테스 본문',
    letterNumber: 10,
    finishCondition: 10
  }

  const articleDomain = new Article(new FakeArticleDao())

  // when
  const actual = await articleDomain.createArticle(articleData)

  // then
  expect(actual).not.toBeNull()
  expect(actual).not.toBeUndefined()
  expect(actual.title).toBe(articleData.title)
})

class FakeArticleDao {
  constructor () {
    this.articleMap = new Map()
  }

  createArticle (articleData) {
    const articleId = 1
    this.articleMap.set(articleId, Object.assign(articleData, {articleId}))
    return this.articleMap.get(articleId)
  }
}
