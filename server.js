const http = require('http');
const { type } = require('os');
const url = require('url');
const { StringDecoder } = require('string_decoder');

const PORT = (process.env.PORT) ? process.env.PORT : 3000;

const server = http.createServer((req , res) => {
    var parsedURL = url.parse(req.url , true);
    var path = parsedURL.pathname;
    var queryString = parsedURL.query;

    var headers = req.headers;
    var method = req.method.toUpperCase();
    
    var decoder = new StringDecoder('utf-8')

    path = path.replace(/^\/+|\/+$/g,"");

    var buffer = "";


    req.on('data' , (data) =>{

        buffer+=decoder.write(data);
    })

    req.on('end' , () => {
        if(method == http.METHODS[19]){
            var route = typeof routes[path] != "undefined" ? routes[path] : routes[notFound]
            route(buffer, res)
        }
    })



})

server.listen(PORT , () => {
    console.log("server listening at "+PORT);
})

var routes = {
    nearByLocation : (data , res) => {

        var {coordinates} = JSON.parse(data)
        console.log(coordinates[0]);
        res.setHeader('Content_Type','application/json')
        res.setHeader('Access-Control-Allow-Origin','*')
        res.writeHead(200)
        res.end()
    },
    notFound : (data , res) => {
        res.write("No Result Found");
        res.end()
    },
    saneen : () => {
        console.log("this is saneen");
    }
}
