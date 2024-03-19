const express = require('express')
const Logger = require('../Logger')
const { createToken, authenticateToken } = require('../authentication')
const pool = require('../db')
const User = require('../models/user')
const PostDetails = require('../models/postDetails')

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
    `SELECT author, 
      tags, 
      publish_date, 
      thumbnail_path 
      FROM post WHERE author = $1::text 
      ORDER BY publish_date desc`,
    [req.user]
  )

  // Fetching all posts from user
  posts = DBData.rows.map((row) => {
    const { author, tags, publish_date, thumbnail_path } = row
    return new PostDetails(author, tags.split(','), publish_date, thumbnail_path)
  })

  res.status(200).json({ posts })
})

module.exports = userRouter
