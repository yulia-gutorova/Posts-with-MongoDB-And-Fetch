const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const postController = require("../controller/postController.js")
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

//*************************************************************************** 
//GET all posts
// http://localhost:5000/api/post (GET)
//*************************************************************************** 
router.get('/', postController.getAllPosts)

//*************************************************************************** 
//GET a specific post
// http://localhost:5000/api/post/23 (GET)
//*************************************************************************** 
router.get('/:postId', postController.getPostById)

//*************************************************************************** 
// UPDATE post by ID
// http://localhost:5000/api/post/23 (PUT)
//*************************************************************************** 
router.put('/:postId', postController.updatePostById)

//*************************************************************************** 
//CREATE a new post
// http://localhost:5000/api/post (POST)
//*************************************************************************** 
router.post('/', postController.createPost)

//***************************************************************************
//DELETE post by ID
// http://localhost:5000/api/post/23 (DELETE)
//***************************************************************************
router.delete('/:postId', postController.deletePostById)

//***************************************************************************
//DELETE all posts
// http://localhost:5000/api/post (DELETE ALL)
//***************************************************************************
router.delete('/', postController.deleteAllPosts)


module.exports = router