const http = require('http');
const url = require('url');

const PORT = (process.env.PORT) ? process.env.PORT : 3000;

const server = http.createServer((req , res) => {
    var parsedURL = url.parse(req.url , true);
    var path = parsedURL.pathname;
    var queryString = parsedURL.query;

    var headers = req.headers;
    var method = req.method.toUpperCase();

    var buffer = "";

    req.on('data' , (data) =>{
        buffer+=data;

        if(method == http.METHODS[19]){
            console.log("post got ");
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

    },
    notFound : (data , res) => {
        res.write("No Result Found");
    }
}
