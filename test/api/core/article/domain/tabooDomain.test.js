import {TabooDomain} from '../../../../../src/api/core/article/domain/tabooDomain'

test('금기어가 존재하는지 확인할 수 있다.', async () => {

  // given
  const hashtags = ['금기어', '테스트', '테스트2']
  const title = '테스트 입니다'
  const tabooDomain = new TabooDomain(new FakeTabooDao())

  // when
  const actual1 = await tabooDomain.isExistTaboo(hashtags)
  const actual2 = await tabooDomain.isExistTaboo(title)

  // then
  expect(actual1).toBe(true)
  expect(actual2).toBe(false)
})

class FakeTabooDao {
  constructor () {
    this.tabooMap = new Map().set('금기어', {
      tabooId: 1,
      text: '금기어',
      createdAt: '2019-12-02T09:46:46.000Z',
      updatedAt: '2019-12-06T03:07:27.000Z',
      deletedAt: null,
    })
  }

  findByText (text) {
    return this.tabooMap.get(text)
  }
}
