const http = require('http');

const myJson = require('./my_json');
const logger = require('./logger');

// tự build middleware chain
function applyMiddleware(req, res, middlewares) {
    let index = 0;

    function next() {
        const middleware = middlewares[index++];
        if (middleware) {
            middleware(req, res, next);
        }
    }

    next();
}

const server = http.createServer((req, res) => {

    applyMiddleware(req, res, [logger, myJson]);

    // delay để chắc middleware chạy xong
    setTimeout(() => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: "OK",
            body: req.body
        }));
    }, 100);
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});