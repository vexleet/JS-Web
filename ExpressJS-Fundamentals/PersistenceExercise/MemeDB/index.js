const http = require('http')
const url = require('url')
const handlers = require('./handlers/handlerBlender')
const db = require('./config/dataBase')
const port = 1337;

require('./config/dataBase')();

http
    .createServer((req, res) => {
        for (let handler of handlers) {
            req.pathname = url.parse(req.url).pathname
            let task = handler(req, res)
            if (task !== true) {
                break
            }
        }
    })
    .listen(port)
console.log('Im listening on ' + port)