export function validateUrlPath(url: string) {
  return /^[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%/]+$/.test(url)
}
