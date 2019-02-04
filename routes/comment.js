/* eslint-disable func-names */
const Post = require('../models/post');
const Comment = require('../models/comment');

const express = require('express');
const router = express.Router();

// CREATE COMMENT
router.post('/posts/:postId/comments', (req, res) => {
  // INSTANTIATE COMMENT MODEL
  const comment = new Comment(req.body);
  // SAVE INSTANCE OF COMMENT MODEL TO DB
  comment 
    .save()
    .then((comment) => { return Post.findById(req.params.postId) })
    .then((post) => { 
      post.comment.unshift(comment); 
      return post.save() 
    })
    .then((post) => { res.redirect('/') })
    .catch((err) => { console.log(err); });
});

module.exports = router; 