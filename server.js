const http = require('http');
const url = require('url');

const PORT = (process.env.PORT) ? process.env.PORT : 8080;

const server = http.createServer((req , res) => {
    var parsedURL = url.parse(req.url , true);
    var path = parsedURL.pathname;
    var queryString = parsedURL.query;

    



})

server.listen(PORT , () => {
    console.log("server listening at "+PORT);
})