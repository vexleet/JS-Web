const mongoose = require('mongoose');

const EditSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.String, required: true},
    creationDate: {type: mongoose.Schema.Types.Date, required: true, default: Date.now()},
    content: {type: mongoose.Schema.Types.String, required: true},
    article: {type: mongoose.Schema.Types.ObjectId, required: true},
});

const Edit = mongoose.model('Edit', EditSchema);

module.exports = Edit;