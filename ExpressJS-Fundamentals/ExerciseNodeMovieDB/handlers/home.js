const fs = require('fs');

module.exports = (req, res) => {
    if (req.url === '/' && req.method === 'GET') {

        fs.readFile('./views/home.html', (err, data) => {
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
    } else {
        return true;
    }
};