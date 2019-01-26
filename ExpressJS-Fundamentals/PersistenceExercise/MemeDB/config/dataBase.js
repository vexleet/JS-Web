const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/meme-db');

    let database = mongoose.connection;

    database.on('error', (err) => {
        console.log(err);
    });

    database.once('open', (err) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Connected!');
    });

    require('../models/MemeSchema');
};