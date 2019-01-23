const qs = require('querystring');
const url = require('url');
const fs = require('fs');
const path = require('path');
let Tag = require('./../models/TagSchema');
let Image = require('./../models/ImageSchema');

module.exports = (req, res) => {
    if (req.pathname === '/search') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/results.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            let content = '';

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            let queryData = qs.parse(url.parse(req.url).query);
            let limit = 10;

            if(queryData.Limit !== ''){
                limit = Number(queryData.Limit);
            }

            if (queryData.tagName === '') {
                Image.find({})
                    .limit(limit)
                    .then(images => {
                        for (let image of images) {
                            content += `<fieldset><legend>${image.imageTitle}:</legend> 
                                    <img src="${image.imageUrl}">
                                    </img><p>${image.description}<p/>
                                    <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
                                    </button> 
                                   </fieldset>`;
                        }

                        let html = data.toString().replace('<div class=\'replaceMe\'></div>', content);

                        res.write(html);
                        res.end();
                    });
            }
            else if (queryData.tagName !== '') {
                let imagesIDs = [];

                Tag.findOne({tagName: queryData.tagName})
                    .then(tag => {
                        for (let currentImageId of tag.images) {
                            imagesIDs.push(currentImageId.toString());
                        }

                        let query = undefined;

                        if (queryData.afterDate !== '' && queryData.beforeDate !== '') {
                            query = { _id: { $in: imagesIDs }, dateStamp: { $gte: Date.parse(queryData.afterDate), $lt: Date.parse(queryData.beforeDate) } };
                        } else if (queryData.afterDate !== '' && queryData.beforeDate === '') {
                            console.log(true);
                            query = { _id: { $in: imagesIDs }, dateStamp: { $gte: Date.parse(queryData.afterDate) } };
                        } else if (queryData.beforeDate !== '' && queryData.afterDate  === '') {
                            query = { _id: { $in: imagesIDs }, dateStamp: { $lt: Date.parse(queryData.beforeDate) } };
                        } else {
                            query = { _id: { $in: imagesIDs } };
                        }

                        Image.find(query)
                            .sort({dateStamp: -1})
                            .limit(limit)
                            .then((images) => {
                                for (let image of images) {
                                    content += `<fieldset><legend>${image.imageTitle}:</legend> 
                                    <img src="${image.imageUrl}">
                                    </img><p>${image.description}<p/>
                                    <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
                                    </button> 
                                   </fieldset>`;
                                }
                                let html = data.toString().replace('<div class=\'replaceMe\'></div>', content);

                                res.write(html);
                                res.end();
                            });
                    });
            }

        });
    } else {
        return true
    }
}
