const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    ownerId: {
        type: mongoose.ObjectId,
        required: true
    },
    text: {
        type: String
    },
    imageArr: {
        type: [String]
    },
    date: {
        type: Date,
        required: true
    },
    likes: {
        type: [mongoose.ObjectId],
        required: true,
    },
    isLiked: {
        type: Boolean,
        default: false
    }

})

const Post = mongoose.model('post', PostSchema)

module.exports = Post;
