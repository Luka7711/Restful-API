const router = require('express').Router();
const verify = require('./veifyToken');
const Comment = require('../model/Comments');
const Data_posts = require('../model/Posts');
const User = require('../model/User');

// create comment. Required params: post id, user id, token, 
router.post('/new/:userid/:postid', verify, async(req, res) => {
    try {
        // create a comment model
        const user = await User.findOne({ "_id": req.params.userid})

        const createdComment = await Comment.create({
            title: req.body.title,
            content: req.body.content,
            rate: req.body.rate,
            author: user._id
        });

        Data_posts.findOne({ "_id": req.params.postid }, async(error, postObj) => {
            if (error) res.status(400).send('Created comment, failed to add author id to post model');
            else {
                postObj.comments.push(createdComment._id);
                postObj.save()
                res.send('success')
            }
        });
    } catch(err) {
        res.status(400).send(err)
    }
})

module.exports = router;