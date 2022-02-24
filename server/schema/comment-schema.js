import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
})
// create collects of comments 
const comment = mongoose.model('comment', CommentSchema);
// collection name,matching schema name
export default comment;