const express = require('express')
const Logger = require('../Logger')
const { createToken, authenticateToken } = require('../authentication')
const { pool, existOnlyOne } = require('../db')
const User = require('../models/user')
const PostDetails = require('../models/postDetails')
const fileManager = require('../fileManager')
const Post = require('../models/post')

const blogRouter = express.Router()

blogRouter.get('/', async (req, res) => {
  const DBData = await pool.query(
    `SELECT 
      id,
      author,
      title,
      tags, 
      publish_date, 
      thumbnail_path
      FROM post
      ORDER BY publish_date desc`
  )

  // Fetching all posts from user
  posts = DBData.rows.map((row) => {
    const { id, author, title, tags, publish_date, thumbnail_path } = row
    return new PostDetails(
      id,
      title,
      author,
      tags.split(','),
      publish_date,
      fileManager.searchImage(thumbnail_path)
    )
  })

  res.status(200).json({ posts })
})

blogRouter.get('/search/:query', async (req, res) => {
  const query = req.params.query.replace('%20', ' ')

  const response = await pool.query(
    `
  SELECT 
  id,
  author,
  title,
  tags,
  publish_date,
  thumbnail_path,
  content_path
  FROM post WHERE title ILIKE '%${query}%'`
  )

  const posts = response.rows.map((row) => {
    const { id, author, title, tags, publish_date, thumbnail_path, content_path } = row
    return new Post(
      id,
      author,
      title,
      tags.split(','),
      publish_date,
      fileManager.searchImage(thumbnail_path),
      fileManager.searchDocument(content_path)
    )
  })
  return res.status(200).json({ message: 'Post found', posts })
})

blogRouter.get('/post/:id', async (req, res) => {
  const postId = req.params.id

  const response = await pool.query(
    `
  SELECT 
  id,
  author,
  title,
  tags,
  publish_date,
  thumbnail_path,
  content_path
  FROM post WHERE id = $1`,
    [postId]
  )

  if (response.rows == 0) {
    return res.status(400).json({ message: `Post with id ${postId} does not exist` })
  } else {
    const { id, author, title, tags, publish_date, thumbnail_path, content_path } = response.rows[0]
    const post = new Post(
      id,
      author,
      title,
      tags.split(','),
      publish_date,
      fileManager.searchImage(thumbnail_path),
      fileManager.searchDocument(content_path)
    )
    return res.status(200).json({ message: 'Post found', post })
  }
})

module.exports = blogRouter
