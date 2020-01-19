import {Tag} from '../../../../../src/api/core/article/domain/tag/Tag'

test('태그를 생성할 수 있다.', async () => {
  // given
  const tags = ['테스트0', '테스트2', '테스트3']
  const articleId = 1
  const fakeTagDao = new FakeTagDao()
  const tagDomain = new Tag(fakeTagDao)

  // when
  await tagDomain.createTag(tags, articleId)

  // then
  expect(fakeTagDao.findByText('테스트').taggedCount).toBe(1)
})

test('태그가 이미 존재한다면 count를 증가 시킨다.', async () => {
  // given
  const tags = ['테스트', '테스트2', '테스트3']
  const articleId = 1
  const fakeTagDao = new FakeTagDao()
  const tagDomain = new Tag(fakeTagDao)

  // when
  await tagDomain.createTag(tags, articleId)

  // then
  expect(fakeTagDao.findByText('테스트').taggedCount).toBe(2)
})

test('태그를 최대 5개 까지만 추가할 수 있다.', async () => {
  // given
  const tags = ['테스트1', '테스트2', '테스트3', '테스트4', '테스트5', '테스트6']
  const articleId = 1
  const tagDomain = new Tag(new FakeTagDao())

  // then
  expect(() => tagDomain.createTag(tags, articleId).toThrow())
})

class FakeTagDao {
  constructor () {
    this.tagMap = new Map().set('테스트',
      {tagId: 1, text: '테스트', taggedCount: 1, createdAt: new Date()}
    )
  }

  findByText (text) {
    return this.tagMap.get(text)
  }

  createTag (tag) {
    const tagId = 2
    const tagData = {tagId, text: tag, taggedCount: 1, createdAt: new Date()}
    this.tagMap.set(tagId, tagData)
    return this.tagMap.get(tagId)
  }

  incrementTagCount (tagId) {
    const tagData = this.tagMap.get('테스트')
    tagData.taggedCount = tagData.taggedCount + 1
    this.tagMap.set(tagId, tagData)
  }

  createArticletag (tagId, articleId) {
    this.tagArticleMap = new Map().set(tagId, {tagId, articleId})
    return this.tagArticleMap.get(tagId)
  }
}
