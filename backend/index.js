const express = require('express')
const router = express.Router()

const pool = require('./src/db')

// GET /posts que retorna un listado de todos los posts.
router.get('/posts', async (req, res) => {
  try {
    const posts = await pool.query('SELECT * FROM post')
    res.status(200).json(posts.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener los posts.' })
  }
})

// GET /posts/:postId que retorna el detalle de un post con el id postId.
router.get('/posts/:postId', async (req, res) => {
  const { postId } = req.params
  try {
    const post = await pool.query('SELECT * FROM post WHERE id = $1', [postId])
    if (post.rows.length === 0) {
      return res.status(404).json({ message: 'El post no fue encontrado.' })
    }
    res.status(200).json(post.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener el post.' })
  }
})

// POST /posts que permite crear un nuevo post.
router.post('/posts', async (req, res) => {
  console.log('hello')
  const { author, tags, thumbnail_path, content_path } = req.body
  try {
    const newPost = await pool.query(
      'INSERT INTO post (author, tags, thumbnail_path, content_path) VALUES ($1, $2, $3, $4) RETURNING *',
      [author, tags, thumbnail_path, content_path],
    )
    res.status(200).json(newPost.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al crear el post.' })
  }
})

// PUT /posts/:postId que permite modificar un post.
router.put('/posts/:postId', async (req, res) => {
  const { postId } = req.params
  const { author, tags, thumbnail_path, content_path } = req.body
  try {
    const updatedPost = await pool.query(
      'UPDATE post SET author = $1, tags = $2, thumbnail_path = $3, content_path = $4 WHERE id = $5 RETURNING *',
      [author, tags, thumbnail_path, content_path, postId],
    )
    if (updatedPost.rows.length === 0) {
      return res.status(404).json({ message: 'El post no fue encontrado.' })
    }
    res.status(200).json(updatedPost.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al modificar el post.' })
  }
})

// DELETE /posts/:postId que borra un post.
router.delete('/posts/:postId', async (req, res) => {
  const { postId } = req.params
  try {
    await pool.query('DELETE FROM post WHERE id = $1', [postId])
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al borrar el post.' })
  }
})

// Crear una instancia de la aplicación Express
const app = express()

// Montar el enrutador en la ruta base '/posts' en la aplicación principal
app.use('/posts', router)

// Puerto en el que se ejecutará el servidor
const port = 3000

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
})
