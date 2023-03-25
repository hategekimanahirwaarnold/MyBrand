const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        email: {
            type: String,
        },
        message: {
            type: String,
        }
    }],
    date: {
        type: String,
        required: true,
    }
}, { timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;


