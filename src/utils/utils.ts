// @ts-nocheck
// group objects by field
export const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    )
    return result
  }, {})
}

// get id from url
export const getIdFromUrl = (url) => {
  let idUrl = url.match(/(\d+)/)[0]
  return idUrl
}