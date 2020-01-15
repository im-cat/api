import jsend from 'jsend'

export const success = (res, status) => entity => {
  if (entity) {
    res.status(status || 200).json(jsend.success(entity))
  }
  return null
}

export const error = (res, {code, message, data}, status = 500) =>
  res.status(status).json(jsend.error({code, message, data}))

export const notFound = res => entity => {
  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}

export const forbidden = res => () => res.status(403).end()
export const badRequest = (res, {code, message, data}) => error(res, {code, message, data}, 400)

export const authorOrAdmin = (res, user, userField) => entity => {
  if (entity) {
    const isAdmin = user.role === 'admin'
    const isAuthor = entity[userField] && entity[userField].equals(user.id)
    if (isAuthor || isAdmin) {
      return entity
    }
    res.status(401).end()
  }
  return null
}
