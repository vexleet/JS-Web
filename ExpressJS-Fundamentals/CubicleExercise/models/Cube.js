const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CubeSchema = new Schema({
    name: {type: mongoose.Schema.Types.String},
    description: {type: mongoose.Schema.Types.String},
    image: {type: mongoose.Schema.Types.String},
    difficulty: {type: mongoose.Schema.Types.String}
});

CubeSchema.path('name')
    .validate(function () {
        return this.name.length >= 3 && this.name.length <= 15;
    }, 'Name must be between 3 and 15 symbols!');

CubeSchema.path('description')
    .validate(function () {
        return this.description.length >= 20 && this.description.length <= 300;
    }, 'Description must be between 20 and 300 symbols');

CubeSchema.path('image')
    .validate(function () {
        return this.image.startsWith('https://')
            && (this.image.endsWith('.jpg') || this.image.endsWith('.png'));
    }, 'Image URL should start with https and end with .jpg or .png');

let Cube = mongoose.model('Cube', CubeSchema);

module.exports = Cube;