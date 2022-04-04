const { MongoClient } = require('mongodb')

var main = async () => {

    const uri = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.mny1q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    const client  = new MongoClient(uri);

    try{
        await client.connect();
    }catch(e){
        console.log("error :" + e);
    }finally{
        await client.close();
    }

}

main().catch(console.error)