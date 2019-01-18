const homeHandler = require('./home');
const filesHandler = require('./static-files');
const allMoviesHandler = require('./movies');
const addMovieHandler = require('./addMovie');

module.exports = [homeHandler, filesHandler, allMoviesHandler, addMovieHandler];