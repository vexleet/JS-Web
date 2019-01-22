const qs = require('querystring');
let Tag = require('./../models/TagSchema');

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    let queryData = '';

    req.on('data', (data) => {
      queryData += data;
    });

    req.on('end', () => {
      let tag = qs.parse(queryData);
      Tag.create(tag)
          .then(() => {
            res.writeHead(302, {
              Location: '/',
            });

            res.end();
          });
    });
  } else {
    return true
  }
}
