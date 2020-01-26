import {ArticleCount} from '../../../../../src/api/core/article/domain/ArticleCount'

test('아티클 카운트 정보를 생성할 수 있다.', async () => {

  // given
  const articleId = 1

  const articleCountDomain = new ArticleCount(new FakeArticleCountDao())

  // when
  const actual = await articleCountDomain.createArticleCount(articleId)

  // then
  expect(actual).not.toBeNull()
  expect(actual).not.toBeUndefined()
  expect(actual.articleId).toBe(articleId)
})

class FakeArticleCountDao {
  constructor () {
    this.articleMap = new Map()
  }

  createArticleCount (articleCountData) {
    this.articleMap.set(articleCountData.articleId, articleCountData)
    return this.articleMap.get(articleCountData.articleId)
  }
}
