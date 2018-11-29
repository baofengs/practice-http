const http = require('http');
const url = require('url');
const utils = require('../../utils/index');

const port = process.argv[2] || 1231;

const server = http.createServer((request, response) => {
    response.write('this is a test');
    response.end();
});

server.listen(port);
console.log(`learn http - cache - cahce-control: running on http://127.0.0.1:${port}`);
