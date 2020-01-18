import jsend from 'jsend'
import Status from 'http-status'

export const success = (res, status) => entity => {
  if (entity) {
    res.status(status || Status.OK).json(jsend.success(entity))
  }
  return null
}

export const error = (res, { code, message, data }, status = Status.INTERNAL_SERVER_ERROR) =>
  res.status(status).json(jsend.error({ code, message, data }))

export const badRequest = (res, { code, message, data }) =>
  error(res, { code, message, data }, Status.BAD_REQUEST)

export const notFound = (res, { code, message, data }) =>
  error(res, { code, message, data }, Status.NOT_FOUND)
