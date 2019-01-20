const url = require('url');
const fs = require('fs');
const qs = require('querystring');
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
    } else if (req.pathname === '/addMovie' && req.method === 'POST') {
        let body = '';

        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {
            let post = qs.parse(body);
            let content = '';

            if (post.movieTitle === '' || post.moviePoster === '') {
                content = "<div id=\"errBox\">" +
                    "<h2 id=\"errMsg\">Please fill all fields</h2> " +
                    "</div>";

                fs.readFile('./views/addMovie.html', (err, data) => {
                    let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', content);

                    res.writeHead(400, {
                        'Content-Type': 'text/html'
                    });

                    res.write(html);
                    res.end();
                });
                return;
            }
            post.id = database.length + 1;
            database.push(post);

            fs.readFile('./views/addMovie.html', (err, data) => {
                content = "<div id=\"succssesBox\">" +
                    "<h2 id=\"succssesMsg\">Movie Added</h2> " +
                    "</div>";

                let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', content);

                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });

                res.write(html);
                res.end();
            });
        });

    } else {
        return true;
    }
};