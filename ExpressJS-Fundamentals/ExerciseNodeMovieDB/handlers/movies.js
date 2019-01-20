const url = require('url');
const fs = require('fs');
let database = require('../config/database');

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/viewAllMovies' && req.method === 'GET') {

        fs.readFile('./views/viewAll.html', (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 Not Found');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            let products = database.sort((a, b) => a.movieYear - b.movieYear);
            let content = '';

            for (let product of products) {
                content += `
                    <div class="movie">
                        <a href="/movies/details/${product.id}">    
                            <img class="moviePoster" src="${product.moviePoster}" />
                        </a>                                     
                    </div>`;
            }

            let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', content);

            res.write(html);
            res.end();
        })
    } else if (req.pathname.startsWith('/movies/details/') === true && req.method === 'GET') {
        let movieId = Number(req.pathname.split('/')[3]);
        let movie = database.filter(x => x.id === movieId);

        fs.readFile('./views/details.html', (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 Not Found');
                res.end();
                return;
            } else if (movie.length === 0) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 Movie does not exist!');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            let content = `
                <div class="content">
                    <img src="${movie[0].moviePoster}" alt="" />
                    <h3>Title: ${movie[0].movieTitle}</h3>
                    <h3>Year: ${movie[0].movieYear}</h3>
                    <p>${movie[0].movieDescription}</p>
                </div>`;
            let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', content);
            res.write(html);
            res.end();
        });
    } else {
        return true;
    }
};