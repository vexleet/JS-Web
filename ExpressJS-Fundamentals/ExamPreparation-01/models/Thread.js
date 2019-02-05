const mongoose = require('mongoose');

const threadSchema = mongoose.Schema({
    users: [{type: mongoose.Schema.Types.String, required: true}],
    createdOn: {type: mongoose.Schema.Types.Date, required: true, default: Date.now()},
});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;