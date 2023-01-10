const Post = require('../models/Post')
const express = require('express')

//*************************************************************************** 
//GET all posts
// http://localhost:5000/api/post (GET)
//*************************************************************************** 
exports.getAllPosts = async (req, res) => {
  const posts = await Post.find({})
  res.status(200).json(posts)
}

//*************************************************************************** 
//GET a specific post
// http://localhost:5000/api/post/23 (GET)
//***************************************************************************
exports.getPostById = async (req, res) => {
    try{  
      const post = await Post.findOne({_id: req.params.postId})
      res.status(200).json({post})}
    catch(err){
      res.status(500).json({message: err.message});
    }  
}

//*************************************************************************** 
// UPDATE post by ID
// http://localhost:5000/api/post/23 (PUT)
//*************************************************************************** 
exports.updatePostById = async (req, res) => {
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
}

//*************************************************************************** 
//CREATE a new post
// http://localhost:5000/api/post (POST)
//*************************************************************************** 
exports.createPost =  async (req, res) => {
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
}

//***************************************************************************
//DELETE post by ID
// http://localhost:5000/api/post/23 (DELETE)
//***************************************************************************
exports.deletePostById = async (req, res) => {
    await Post.deleteOne({_id: req.params.postId})
    res.status(200).json({
      message: 'Deleted'
    })
}

//***************************************************************************
//DELETE all posts
// http://localhost:5000/api/post (DELETE ALL)
//***************************************************************************
exports.deleteAllPosts = async (req, res) => {
    await Post.deleteMany({})
    res.status(200).json({
      message: 'All deleted'
    })
  }
