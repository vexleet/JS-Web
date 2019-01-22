const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const multiparty = require('multiparty');
const shortid = require('shortid');
const database = require('../config/dataBase');

module.exports = (req, res) => {
    if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
        fs.readFile('./views/viewAll.html', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            let content = '';
            let memes = database.getDb()
                .filter(x => x.privacy === 'on')
                .sort((a, b) => b.dateStamp - a.dateStamp);

            for (let meme of memes) {
                content += `<div class="meme">
          <a href="/getDetails?id=${meme.id}">
          <img class="memePoster" src="${meme.memeSrc}"/>          
 </div>`

            }

            let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', content);

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(html);
            res.end();
        });
    } else if (req.pathname === '/addMeme' && req.method === 'GET') {
        fs.readFile('./views/addMeme.html', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(data);
            res.end();
        });
    } else if (req.pathname === '/addMeme' && req.method === 'POST') {
        let form = new multiparty.Form();
        let meme = undefined;

        form.on('part', (part) => {
            if (part.filename) {
                let dataString = '';
                part.setEncoding('binary');

                part.on('data', (data) => {
                    dataString += data;
                });

                meme = qs.parse(dataString);

                part.on('end', () => {
                    let fileName = shortid.generate();
                    let splitFile = part.filename.split('.');
                    let fileFormat = splitFile[splitFile.length - 1];
                    let filePath = './public/memeStorage/' + `${fileName}.${fileFormat}`;

                    meme.id = fileName;
                    meme.memeSrc = filePath;
                    meme.dateStamp = Date.now();

                    fs.writeFile(filePath, dataString, {encoding: 'ascii'}, (err) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                    });
                });
            } else {
                part.setEncoding('utf-8');
                let field = '';
                part.on('data', (data) => {
                    field += data;
                });

                part.on('end', () => {
                    meme[part.name] = field;
                });
            }
        });

        form.on('close', () => {
            database.add(meme);
            database.save();

            res.writeHead(302, {
                Location: '/'
            });

            res.end();
        });

        form.parse(req);
    } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {

        fs.readFile('./views/details.html', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            let queryData = qs.parse(url.parse(req.url).query);
            let targetedMeme = database.getDb().find(x => x.id === queryData.id);

            if (targetedMeme.length === 0) {
                res.writeHead('404', {
                    'Content-Type': 'text/plain'
                });

                res.write('404 Not Found!');
                res.end();
                return;
            }

            let content = `<div class="content">
                                <img src="${targetedMeme.memeSrc}" alt=""/>
                                <h3>Title: ${targetedMeme.title}</h3>
                                <p> ${targetedMeme.description}</p>
                            </div>`;

            let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', content);

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(html);
            res.end();
        });


    } else if (req.pathname.startsWith('public/memeStorage') && req.method === 'GET') {
        console.log('HERE')
    } else {
        return true
    }
}
