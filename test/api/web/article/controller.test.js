/*
import request from 'supertest'
import jsend from 'jsend'
import {apiRoot, syncForce, syncModels, db, env} from '../../../../src/api/config'
import express from '../../../../src/api/config/express'
import routes from '../../../../src/api/web/article'
import {sign} from '../../../../src/api/common/jwt'
import {sequelize} from '../../../../src/api/config/sequelize'

const app = () => express(apiRoot, routes)

let accessToken

beforeEach(async () => {
  await sequelize.authenticate()
  if (syncModels)₩ {
    await sequelize.sync({force: syncForce})
  }

  const memberId = 1
  accessToken = await _getAccessToken(memberId)
})

afterEach(async () => {
  await sequelize.close()
})

test('POST /articles to be 200', async () => {
  const {status, body} = await request(app)
    .post(apiRoot)
    .auth(accessToken, {type: 'bearer'})
    .send({
      title: '테스트 제목',
      mainText: '테스트 본문 입니다',
      letterNumber: 50,
      finishCondition: 10,
      tags: ['테스트1', '테스트2', '테스트3', '테스트4', '테스트5']
    })

  expect(status).toBe(201)
  expect(jsend.isValid(body)).toBe(true)
  expect(typeof body.data).toBe('object')
  expect(body.data.letterNumber).toBe(50)
  expect(body.data.tags).toHaveLength(5)
})

const _getAccessToken = async (memberId) => sign(memberId)
*/
