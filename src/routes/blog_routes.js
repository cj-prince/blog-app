const express = require('express')
const router = express.Router()
const post = require('../controllers/blogController')


router.get('/post',post.getAll)
router.get('/post/:id', post.getAll);
router.post('/post', post.postBlog);
router.put('/post/:id', post.editPost);
router.delete('/post/:id', post.deletePost);


module.exports = router
