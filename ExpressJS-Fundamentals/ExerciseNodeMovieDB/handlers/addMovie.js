const url = require('url');
const fs = require('fs');
var qs = require('querystring');
let database = require('../config/database');

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/addMovie' && req.method === 'GET') {

        fs.readFile('./views/addMovie.html', (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('404 Not Found!');
                res.end();

                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(data);
            res.end();
        });
    }
    else if(req.pathname === '/addMovie' && req.method === 'POST'){
        let body = '';

        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {
            let post = qs.parse(body);

            // if(movieTitle === '' || moviePoster === ''){
            //
            // }
            post.id = database.length + 1;
            database.push(post);
            // TODO: Save movies

            res.writeHead(302, {
                Location: '/'
            });

            res.end();
        });

    }
    else{
        return true;
    }
};
