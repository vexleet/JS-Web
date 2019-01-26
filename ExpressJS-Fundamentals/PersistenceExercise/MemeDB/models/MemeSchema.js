const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memeSchema = new Schema({
    title: {type: Schema.Types.String, required: true},
    memeSrc: {type: Schema.Types.String, required: true},
    description: {type: Schema.Types.String},
    privacy: {type: Schema.Types.String},
    dateStamp: {type: Schema.Types.Date, default: Date.now()}
});

let Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;