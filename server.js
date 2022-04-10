const http = require('http');
const { type } = require('os');
const url = require('url');
const { StringDecoder } = require('string_decoder');

const {MongoClient} = require('mongodb');
const { config } = require('process');

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
        connectMongoDB().catch(console.error)
        res.setHeader('Content_Type','application/json')
        res.setHeader('Access-Control-Allow-Origin','*')
        res.write(JSON.stringify(coordinates))
        res.end()
    },
    notFound : (data , res) => {
        res.write("No Result Found");
        res.end()
    },
    saneen : (data,res) => {
        res.write("Thi is saneen")
        res.end()
    }
}

var connectMongoDB = async () => {

    const uri = 'mongodb+srv://test:0kUkd360hKNaraDd@location-testing.mny1q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    const client = new MongoClient(uri)

    try{
        await client.connect();
        console.log("Mongo DB connected");
    }catch(e){
        console.log("Mongo error : " + e);
    }finally{
        console.log("MongoDB connection closing");
        await client.close()
    }
}