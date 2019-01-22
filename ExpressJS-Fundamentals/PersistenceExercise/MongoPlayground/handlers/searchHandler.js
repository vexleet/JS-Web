const qs = require('querystring');
const url = require('url');
const fs = require('fs');
let Tag = require('./../models/TagSchema');
let Image = require('./../models/ImageSchema');

module.exports = (req, res) => {
    if (req.pathname === '/search') {
        let content = '';
        // let searchResult = qs.parse(url.parse(req.url).query);

        Tag.find({})
            .then((tags) => {
                for (let tag of tags) {
                    for (let idsOfImages of tag.images) {
                        Image.findById(idsOfImages)
                            .then((foundImage) => {
                                content += `<fieldset><legend>${foundImage.imageTitle}:</legend> 
                                    <img src="${foundImage.imageUrl}">
                                    </img><p>${foundImage.description}<p/>
                                    <button onclick='location.href="/delete?id=${foundImage._id}"'class='deleteBtn'>Delete
                                    </button> 
                                   </fieldset>`;
                            });
                    }
                }

                fs.readFile('./views/results.html', (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    let html = data.toString().replace('<div class=\'replaceMe\'></div>', content);

                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });

                    res.write(html);
                    res.end();
                });
            });
    } else {
        return true
    }
}
