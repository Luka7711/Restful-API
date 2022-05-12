const router = require('express').Router();
const verify = require('./veifyToken');
const Post = require('../model/Posts');
const User = require('../model/User');

router.get('/', verify, (req, res) => {
    res.json({
         posts: {
              title: 'my first post',
              description: 'random data you shouldn access'
        }
    })
})

// creates new POST
router.post('/:id/new', verify, (req, res) => {
    // chech users token, if not provided return NOT authorized
    User.findOne( { '_id': req.params.id } , async(err, foundUser) => {
        
        if (err) {
            res.status(404).send('User not found!');
        } else {
            const newPost = await Post.create({
                title: req.body.title,
                content: req.body.content,
                author: foundUser._id
            });
            await newPost.save();
            await foundUser.posts.push(newPost._id)
            await foundUser.save();
            res.send(newPost);
        }
    })

    // add post id to User model

})

router.delete('/:id', (req, res) => {
    Post.findOneAndDelete({"_id": req.params.id}, (err, docs) => {
        if (err) {
            res.status(400).send("Not able to delete, something went wrong!")
        } else {
            const deleteTitle = docs.title;
            res.send("Successfuly deleted:" + deleteTitle);
        }
    })
})

router.put('/:id', async(req, res) => {
    try {
        const update = {
            title: req.body.title,
            content: req.body.content
        }
        const filter = { '_id': req.params.id }
        const updatedPost = await Post.findOneAndUpdate(filter, update);
        res.status(200).send("Successfuly update: " + updatedPost.title)
    } catch (err) {
        res.status(400).send("Failed to update post!")
    }
});






module.exports = router;