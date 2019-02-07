const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {type: mongoose.Schema.Types.String, required: true},
    isLocked: {type: mongoose.Schema.Types.Boolean, required: true, default: false},
    edits: [{type: mongoose.Schema.Types.ObjectId, ref: 'Edit'}],
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;