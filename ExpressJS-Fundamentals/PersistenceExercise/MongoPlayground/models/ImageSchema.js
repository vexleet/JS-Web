const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let imageSchema = new Schema({
    imageUrl: {type: Schema.Types.String},
    dateStamp: {type: Schema.Types.Date, default: Date.now()},
    imageTitle: {type: Schema.Types.String},
    description: {type: Schema.Types.String},
    tags: [{type: Schema.Types.Mixed, ref: 'Tag'}]
});

let Image = mongoose.model('Image', imageSchema);

module.exports = Image;