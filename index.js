const url = require('url');
const http = require('http');
const md5 = require('js-md5');
const fs = require('fs');
const port = process.argv[2];
console.log('argv: ', port);

const expiresTime = (new Date(+(new Date()) + 60000)).toGMTString();

const server = http.createServer((request, response) => {
    const parseUrl = url.parse(request.url, true);
    const pathWithQuery = request.url;
    let queryString = '';
    if (pathWithQuery.indexOf('?') > -1) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'));
    }
    const path = parseUrl.path;
    const query = parseUrl.query;
    const method = request.method;

    // console.log({
    //     parseUrl,
    //     pathWithQuery,
    //     queryString,
    //     path,
    //     query,
    //     method
    // });
    if (path === '/1') {
        response.setHeader('Content-Type', 'text/html; Charset=utf-8;');
        response.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <link rel="stylesheet" href="/style"/>
                </head>
                <body>
                <h1>你好</h1>
                <script src="/js"></script>
                <script src="/expires"></script>
                </body>
            </html>
        `);
    } else if (path === '/style') {
        response.setHeader('Cache-Control', 'max-age=3600');
        response.setHeader('Content-Type', 'text/css; Charset=utf-8');
        response.write(`
            h1 { color: red}
        `);
    } else if (path === '/js') {
        const jsStr = `console.log('hello tianxiao1')`;
        const md5edJsStr = md5(jsStr);
        const ifNoneMatch = request.headers['if-none-match'];
        if (ifNoneMatch === md5edJsStr) {
            response.statusCode = 304;
            response.end();
        } else {
            response.setHeader('Etag', md5edJsStr);
            response.setHeader('Content-Type', 'application/javascript; Charset=utf-8;');
            response.write(`console.log('this is js');`);
        }
    } else if (path === '/expires') {
        response.setHeader('Content-Type', 'application/javascript; Charset=utf-8;');
        response.setHeader('Cache-Control', 'no-store');
        response.setHeader('Expires', expiresTime);
        response.write(`console.log('this is expires')`);
    } else if (path === '/fs') {
        const file = fs.readFileSync('./index.html');
        const fileState = fs.statSync('./index.html');
        const ifModifiedSince = request.headers['if-modified-since'];
        console.log(+(new Date(ifModifiedSince)), +(new Date(fileState.ctime)));
        if (Math.abs((new Date(ifModifiedSince)) - (new Date(fileState.ctime))) < 1000) {
            response.statusCode = 304;
            response.end();
        } else {
            response.setHeader('Last-modified', (new Date(fileState.ctime).toGMTString()));
            response.setHeader('Content-Type', 'text/html; Charset=utf-8;');
            response.write(file);
        }
    }
    
    else {
        response.setHeader('Content-Type', 'text/plain; Charset=utf-8;');
        response.write('你找的资源不存在');
    }
    setTimeout(() => {
        response.end();
    }, 1000);
    
});

server.listen(port);
console.log(`listening on: http://127.0.0.1:${port}`);
