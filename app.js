const { MongoClient } = require('MongoClient')

var main = async () => {

    const uri = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.mny1q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    const client  = new MongoClient(uri);

    await client.connect();

}