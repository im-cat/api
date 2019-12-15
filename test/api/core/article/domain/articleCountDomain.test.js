import {ArticleCountDomain} from '../../../../../src/api/core/article/domain/articleCountDomain'

test('아티클 카운트 정보를 생성할 수 있다.', async () => {

  // given
  const articleId = 1

  const articleCountDomain = new ArticleCountDomain(new FakeArticleCountDao())

  // when
  const articleCountInfo = await articleCountDomain.createArticleCount(articleId)

  // then
  expect(articleCountInfo).not.toBeNull()
  expect(articleCountInfo).not.toBeUndefined()
  expect(articleCountInfo.articleId).toBe(articleId)
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
