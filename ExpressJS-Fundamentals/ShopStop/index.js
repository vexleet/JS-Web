const http = require('http');
const port = 1337;
const handlers = require('./handlers');

http.createServer((req, res) => {
    for(let handler of handlers){
        if(!handler(req, res)){
            break;
        }
    }
}).listen(port);

console.log('Listening on port ' + port);
