const http = require('http');
const { type } = require('os');
const url = require('url');

const PORT = (process.env.PORT) ? process.env.PORT : 3000;

const server = http.createServer((req , res) => {
    var parsedURL = url.parse(req.url , true);
    var path = parsedURL.pathname;
    var queryString = parsedURL.query;

    var headers = req.headers;
    var method = req.method.toUpperCase();

    path = path.replace(/^\/+|\/+$/g,"");

    var buffer = "";


    req.on('data' , (data) =>{

        buffer+=data;
        if(method == http.METHODS[19]){

            var route = typeof routes[path] != "undefined" ? routes[path] : routes[notFound]
            route(buffer.toString() , res)

        }


    })

    req.on('end' , () => {
        res.writeHead(200 , "OK" , {'Content-Type' : 'text/plain'})
        res.write("The response is : ")
        res.write(buffer)
        res.end("End of message")
    })



})

server.listen(PORT , () => {
    console.log("server listening at "+PORT);
})

var routes = {
    nearByLocation : (data , res) => {
        var {coordinates} = data
        res.setHeader('Content_Type','application/json')
        res.setHeader('Access-Control-Allow-Origin','*')
        res.writeHead(200)
        res.write(coordinates)
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
