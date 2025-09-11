export class LinkNotFound extends Error {
  static throw() {
    return new LinkNotFound('This shortened URL does not exist')
  }
}
