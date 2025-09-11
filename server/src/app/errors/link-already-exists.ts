export class LinkAlreadyExists extends Error {
  static throw() {
    return new LinkAlreadyExists('This shortened URL already exists')
  }
}
