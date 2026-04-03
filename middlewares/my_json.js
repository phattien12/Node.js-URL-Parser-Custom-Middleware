// my_json.js
module.exports = function myJson(req, res, next) {
    let data = '';

    // nhận data từng chunk
    req.on('data', chunk => {
        data += chunk;
    });

    // khi nhận xong
    req.on('end', () => {
        try {
            if (data) {
                req.body = JSON.parse(data);
            } else {
                req.body = {};
            }
        } catch (err) {
            req.body = {};
        }

        next();
    });
};