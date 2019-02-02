const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
    content: {type: mongoose.Schema.Types.String, required: true},
    article: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Article'},
    creator: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
});

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;