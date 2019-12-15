import {ArticleDomain} from '../../../../../src/api/core/article/domain/articleDomain'

test('아티클을 생성할 수 있다.', async () => {

  // given
  const articleData = {
    memberId: 1,
    title: '테스트 제목',
    mainText: '테스 본문',
    letterNumber: 10,
    finishCondition: 10
  }

  const articleDomain = new ArticleDomain(new FakeArticleDao())

  // when
  const articleInfo = await articleDomain.createArticle(articleData)

  // then
  expect(articleInfo).not.toBeNull()
  expect(articleInfo).not.toBeUndefined()
  expect(articleInfo.title).toBe(articleData.title)
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