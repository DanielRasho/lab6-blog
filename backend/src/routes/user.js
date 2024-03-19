const express = require('express')
const Logger = require('../Logger')
const { createToken, authenticateToken } = require('../authentication')
const { pool, existOnlyOne } = require('../db')
const User = require('../models/user')
const PostDetails = require('../models/postDetails')
const fileManager = require('../fileManager')
const Post = require('../models/post')
const { log } = require('winston')

const userRouter = express.Router()

userRouter.get('/', authenticateToken, async (req, res) => {
  const DBData = await pool.query(
    `SELECT username, password 
    FROM member WHERE username = $1::text`,
    [req.user]
  )
  const { username, password } = DBData.rows[0]
  res.status(200).json({ username: username, password: password })
})

userRouter.get('/posts', authenticateToken, async (req, res) => {
  const DBData = await pool.query(
    `SELECT 
      id,
      author,
      title,
      tags, 
      publish_date, 
      thumbnail_path
      FROM post WHERE author = $1::text 
      ORDER BY publish_date desc`,
    [req.user]
  )

  // Fetching all posts from user
  posts = DBData.rows.map((row) => {
    const { id, author, title, tags, publish_date, thumbnail_path } = row
    return new PostDetails(
      id,
      author,
      title,
      tags.split(','),
      publish_date,
      fileManager.searchImage(thumbnail_path)
    )
  })

  res.status(200).json({ posts })
})

userRouter.get('/posts/:id', async (req, res) => {
  const postId = req.params.id

  if (!postId) {
    return res.status(400).json({ message: 'Post id not sended.' })
  }

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

userRouter.post('/posts', authenticateToken, async (req, res) => {
  const { author, title, tags, thumbnail, content } = req.body
  if (!author || !tags || !thumbnail || !content) {
    return res.status(400).json({ message: 'Some fields are empty, cant create post.' })
  }

  const postExist = await existOnlyOne(
    pool,
    `SELECT * FROM post WHERE author = $1::text AND title = $2::text`,
    [author, title]
  )

  if (postExist) {
    res.status(400).json({ message: 'Post already exist' })
  } else {
    const thumbnailPath = fileManager.saveImage(author, title, thumbnail)
    const contentPath = fileManager.saveDocument(author, title, content)
    await pool.query(
      ` 
    INSERT INTO post (author, title, tags, thumbnail_path, content_path)
    VALUES ($1::text, $2::text, $3::text, $4::text, $5::text)`,
      [author, title, tags, thumbnailPath, contentPath]
    )
    res.status(200).json({ message: 'Post created' })
  }
})

module.exports = userRouter
