const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let tagSchema = new Schema({
    tagName: {type: Schema.Types.String, require: true},
    dateStamp: {type: Schema.Types.Date, default: Date.now()},
    images: [{type: Schema.Types.ObjectId, ref: 'Images'}]
});

let Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;