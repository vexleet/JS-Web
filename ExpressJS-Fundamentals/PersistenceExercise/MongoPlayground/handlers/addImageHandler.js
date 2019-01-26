const qs = require('querystring');
const url = require('url');
let Tag = require('./../models/TagSchema');
let Image = require('./../models/ImageSchema');

module.exports = (req, res) => {
    if (req.pathname === '/addImage' && req.method === 'POST') {
        let queryData = '';

        req.on('data', (data) => {
            queryData += data;
        });

        req.on('end', () => {
            let field = qs.parse(queryData);
            let tags = field.tagsID.split(',').reduce((p, c, i, a) => {
                if (p.includes(c) || c.length === 0) {
                    return p;
                } else {
                    p.push(c);
                    return p;
                }
            });

            let image = {
                imageUrl: field.imageUrl,
                imageTitle: field.imageTitle,
                description: field.description,
                tags
            };

            Image.create(image)
                .then(insertedImage => {
                    insertedImage.tags.forEach(x => {
                        Tag.findById(x)
                            .then(tag => {
                                tag.images.push(insertedImage._id);
                                tag.save();

                                res.writeHead(302, {
                                    Location: '/'
                                });

                                res.end();
                            });
                    });
                });
        });
    } else if (req.pathname === '/delete' && req.method === 'GET') {
        let queryData = qs.parse(url.parse(req.url).query);

        Image.deleteOne({_id: queryData.id})
            .then(() => {
                res.writeHead(302, {
                    Location: '/'
                });

                res.end();
            });

    } else {
        return true
    }
}