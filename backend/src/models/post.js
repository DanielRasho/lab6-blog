/**
 * Definition of a Post object
 */
export default class Post {
  /**
   *
   * @param {string} author
   * @param {Array.<string>} tags
   * @param {string} publishDate
   * @param {string} thumbnailPath server file path to post's thumbnail
   * @param {string} contentPath server file path to post's content
   */
  constructor(author, tags, publishDate, thumbnailPath, contentPath) {
    this.author = author
    this.tags = tags
    this.publishDate = publishDate
    this.thumbnailPath = thumbnailPath
    this.contentPath = contentPath
  }
}
