const qs = require('querystring');
let Tag = require('./../models/TagSchema');
let Image = require('./../models/ImageSchema');

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    let queryData = '';

    req.on('data', (data) => {
      queryData += data;
    });

    req.on('end', () => {
      let image = qs.parse(queryData);
      image.tags = image.tags.split(',').filter(x => x !== '');
      image.tagsID = image.tagsID.split(',').filter(x => x !== '');

      Image.create(image)
          .then(insertedImage => {
            image.tagsID.forEach(id => {
              Tag.findById(id)
                  .then(tag => {
                    tag.images.push(insertedImage._id);
                    tag.save();
                  });
            });

            res.writeHead(302, {
              Location: '/'
            });

            res.end();
          });
    });
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)
  } else {
    return true
  }
}
