export const getFromLocalStorage = key => {
  if (!key || typeof window === 'undefined') {
    return ''
  }
  const getToken = localStorage.getItem(key)
  const token = JSON.parse(getToken)
  return token
}
