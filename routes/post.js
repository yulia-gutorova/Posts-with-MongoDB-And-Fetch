const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

// http://localhost:5000/api/post (GET)
router.get('/', async (req, res) => {
  const posts = await Post.find({})
  res.status(200).json(posts)
})

// http://localhost:5000/api/post/23 (GET)
router.get('/:postId', async (req, res) => {
  try{  
    const post = await Post.findOne({_id: req.params.postId})
    res.status(200).json({post})}
  catch(err){
    res.status(500).json({message: err.message});
  }

})

// http://localhost:5000/api/post/23 (PUT)
router.put('/:postId', async (req, res) => {
  try{  
    //const post = await Post.findOne({_id: req.params.postId});
    let updatedPost = req.body;
    console.log('updated post');
    console.log(req.params.postId);
    console.log(updatedPost);

    let post = await Post.findOneAndUpdate(
      {_id:req.params.postId}, 
      {title:updatedPost.title,
      text:updatedPost.text});

    post = await Post.findOne({_id:req.params.postId});
    console.log(post);
    res.status(200).json({post})}
  catch(err){
    res.status(500).json({message: err.message});
  }

})

// http://localhost:5000/api/post (POST)
router.post('/', jsonParser, async (req, res) => {
  let newPost = req.body;
  console.log(JSON.stringify(req.body));
  //res.status(200).json(body);
 
    const postData = {
    title:newPost.title,
    text:newPost.text
  }

  const post = new Post(postData)

  await post.save()
  res.status(201).json(post) 
})

// http://localhost:5000/api/post/23 (DELETE)
router.delete('/:postId', async (req, res) => {
  await Post.deleteOne({_id: req.params.postId})
  res.status(200).json({
    message: 'Deleted'
  })
})

// http://localhost:5000/api/post (DELETE ALL)
router.delete('/', async (req, res) => {
  await Post.deleteMany({})
  res.status(200).json({
    message: 'All deleted'
  })
})


module.exports = router