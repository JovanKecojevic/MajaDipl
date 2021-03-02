const mongoose = require('mongoose');
const _ = require('lodash');
var request = require('request');

const Post = mongoose.model('postModel');

module.exports.getPosts = (req, res, next) =>
{
  Post.find().then(documents => {
    res.status(200).send(documents);
  });
}


module.exports.createPost = (req, res, next) =>
{
  console.log("_________________________");
  console.log(req.body);
  var post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.date = req.body.date;
  post.postType = req.body.type;
  post.subject = req.body.subject;
  post.author = req.body.author;
  post.authorName = req.body.authorName;

  post.save((err, doc) => {
    if (!err)
    {
      res.status(200).json({ message: "Post successfuly created!" });
    }
    else
    {
      console.log(err);
    }
  });
}

module.exports.deletePost = (req, res, next) =>
{
  Post.deleteOne({ date: req.params.date }).then(result => {
    console.log(result);
    if(result.n!=0)
    res.status(200).json({ message: "Post deleted!" });
    else
    res.status(200).json({ message: "Post not found!" });
  })
    .catch(err => {
      alert("GReska");
      console.log("Error! Failed to delete subject!");
      res.status(400).json({ message: err });
    });
}


module.exports.putPost = (req, res, next) =>
{
    console.log(req.body);
    var post=
    {
      title : req.body.post.title,
      content : req.body.post.content,
      date : req.body.post.date,
      postType : req.body.post.type,
      subject : req.body.post.subject,
      author : req.body.post.author,
      authorName : req.body.post.authorName
    }

    Post.updateOne({date : req.body.old }, post).then(documents => {
      res.status(200).json({
        message: 'Successfully updated Subject!'
      });
    });

}

