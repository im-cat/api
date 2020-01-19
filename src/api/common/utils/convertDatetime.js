export const convertDatetime = date => {
  const nullDate = new Date(null)
  if (date) {
    if (nullDate.getTime() === date.getTime()) {
      return null
    }
  }

  return date
}
