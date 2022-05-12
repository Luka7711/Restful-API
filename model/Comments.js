const mongoose = require('mongoose');
const Schema = mongoose;

const commentSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: 3
    },
    content: {
        type: String,
        required: true,
        min: 20
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    }
});

module.exports = mongoose.model('Comment', commentSchema);