import {TabooDomain} from '../../../../../src/api/core/article/domain/tabooDomain'

test('금기어가 존재하는지 확인할 수 있다.', async () => {

  // given
  const taboo = '금기어'
  const tabooDomain = new TabooDomain(new FakeTabooDao())

  // when
  const tabooInfo = await tabooDomain.isExistTaboo(taboo)

  // then
  expect(tabooInfo).not.toBeNull()
  expect(tabooInfo).not.toBeUndefined()
  expect(tabooInfo).toBe(true)
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
