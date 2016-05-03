export function str_limit (value, start, limit) {
  var readmore = ''

  if (!value) {
    return
  }

  if (value.length > limit) {
    readmore = ' ..[more]'
  }
  return value.substr(start, limit) + readmore
}
