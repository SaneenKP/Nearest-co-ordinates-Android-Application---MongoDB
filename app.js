const { MongoClient } = require('mongodb')



var main = async () => {

    const uri = 'mongodb+srv://test:0kUkd360hKNaraDd@location-testing.mny1q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    const client  = new MongoClient(uri);

    try{
        await client.connect();
        await createMultipleListing(client , [
            {
                name: "athul_krishna",
                location: {
                    type: "Point",
                    coordinates: [10.044336779974401 , 76.33358725346625]
                },
                has_joined : true,
            },
            {
                name: "saneen_kp",
                location: {
                    type: "Point",
                    coordinates: [10.044324207119644 , 76.33359932340682]
                },
                has_joined : true,
            },
            {
                name: "mohammed_fahad",
                location: {
                    type: "Point",
                    coordinates: [10.044242483563721,76.3335170969367]
                },
                has_joined : true,
            },
            {
                name: "saneen_kp",
                location: {
                    type: "Point",
                    coordinates: [10.044324207119644 , 76.33359932340682]
                },
                has_joined : true,
            },
            {
                name: "saneen_kp",
                location: {
                    type: "Point",
                    coordinates: [10.044324207119644 , 76.33359932340682]
                },
                has_joined : true,
            },
        ])
        await createListing(client ,
        // {
        //     user:{
        //         name: "saneen_kp",
        //         location: {
        //             type: "Point",
        //             coordinates: [10.044324207119644 , 76.33359932340682],
        //         },
        //         has_joined: true,
        //     }
        // }
        {
            name: "saneen_kp",
            location: {
                type: "Point",
                coordinates: [10.044324207119644 , 76.33359932340682]
            },
            has_joined : true,
        }
        )

    }catch(e){
        console.log("error :" + e);
    }finally{
        await client.close();
    }

}

main().catch(console.error)


var createMultipleListing = async (client , listing) => {

    const result = await client.db("sample_location").collection("UsersAndLocations").insertMany(listing);
    console.log(result.insertedCounts+" No. of documents inserted :" + result.insertedIds);
}

var createListing = async (client , newListing) => {
    const result = await client.db("sample_location").collection("UsersAndLocations").insertOne(newListing);
    console.log("new listing created with listing ID :" + result.insertedId);
}

async function listDatabases(client){
    const databaseList = await client.db().admin().listDatabases();
    console.log("Databases : ");

    databaseList.databases.forEach(db => {
        console.log(db.name);
    });
}