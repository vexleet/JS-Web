const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: {type: mongoose.Schema.Types.String, required: true},
    content: {type: mongoose.Schema.Types.String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: {type: mongoose.Schema.Types.Date, default: Date.now()},
    summary: {type: mongoose.Schema.Types.String, required: true}
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;