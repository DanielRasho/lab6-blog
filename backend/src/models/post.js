/**
 * Definition of a Post object
 */
class Post {
  /**
   *
   * @param {string} author
   * @param {Array.<string>} tags
   * @param {string} publishDate
   * @param {string} thumbnailPath server file path to post's thumbnail
   * @param {string} contentPath server file path to post's content
   */
  constructor(id, author, title, tags, publishDate, thumbnailPath, contentPath) {
    this.id = id
    this.title = title
    this.author = author
    this.tags = tags
    this.publishDate = publishDate
    this.thumbnailPath = thumbnailPath
    this.contentPath = contentPath
  }
}

module.exports = Post
