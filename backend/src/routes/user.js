const express = require('express')
const Logger = require('../Logger')
const { createToken, authenticateToken } = require('../authentication')
const { pool, existOnlyOne } = require('../db')
const User = require('../models/user')
const PostDetails = require('../models/postDetails')
const fileManager = require('../fileManager')

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
      tags, 
      publish_date, 
      thumbnail_path
      FROM post WHERE author = $1::text 
      ORDER BY publish_date desc`,
    [req.user]
  )

  // Fetching all posts from user
  posts = DBData.rows.map((row) => {
    const { id, author, tags, publish_date, thumbnail_path } = row
    return new PostDetails(
      id,
      author,
      tags.split(','),
      publish_date,
      fileManager.searchImage(thumbnail_path)
    )
  })

  res.status(200).json({ posts })
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
