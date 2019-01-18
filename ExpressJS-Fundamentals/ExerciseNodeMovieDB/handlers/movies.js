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
                        <img class="moviePoster" src="${product.moviePoster}" />                    
                    </div>`;
            }

            let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', content);

            res.write(html);
            res.end();
        })
    } else {
        return true;
    }
};