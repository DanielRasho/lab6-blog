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

module.exports = blogRouter
