const { MongoClient } = require('mongodb')



var main = async () => {

    const uri = 'mongodb+srv://test:0kUkd360hKNaraDd@location-testing.mny1q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    const client  = new MongoClient(uri);

    try{
        await client.connect();
        await findNearest(client , 76.33359932340682, 10.044324207119644)

        // await findOneListingByName(client , 10.044242483563721 , 76.3335170969367)
        //await findListingWithCoordinates(client , false)

        /*await createMultipleListing(client , [
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
                name: "elson_jose",
                location: {
                    type: "Point",
                    coordinates: [10.047580964744647 , 76.3335170969367]
                },
                has_joined : true,
            },
            {
                name: "junaid_tk",
                location: {
                    type: "Point",
                    coordinates: [10.044301198795438 , 76.33308257907629]
                },
                has_joined : true,
            },
            {
                name: "emilie_clarke",
                location: {
                    type: "Point",
                    coordinates: [10.04436674527824 , 76.3336140755564]
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
        */
    }catch(e){
        console.log("error :" + e);
    }finally{
        await client.close();
    }

}

main().catch(console.error)

var findNearest = async (client , longitude , latitude) => {
    const result = await client.db("sample_location") .collection("UsersAndLocations").createIndex({"location" : "2dsphere"})
    const resultCursor = await client.db("sample_location") .collection("UsersAndLocations").find(
    {
        location: 
        {
            $near: 
            { 
                $geometry : 
                { 
                    type: "Point" , 
                    coordinates : [10.04436674527824 , 76.3336140755564] 
                }, 
                $maxDistance: 100,
                $minDistance: 30,
            }, 
        }, 
    }
    )

    const finalResult = await resultCursor.toArray();
    if(finalResult.length === 0){
        console.log("sorry no results found : ");
    }else{
        console.log(finalResult);
    }

}

var findListingWithCoordinates = async (client , has_joined) => {
    const cursor = await client.db("sample_location").collection("UsersAndLocations").find({has_joined: has_joined});
    const result = await cursor.toArray();
    if(result == null){
        console.log("name of the listing : ");
        console.log(result);
    }else{
        console.log("sorry no results found");
    }
}

var findOneListingByName = async (client , c1 , c2) => {
    const result = await client.db("sample_location").collection("UsersAndLocations").findOne({location : {type: "Point",coordinates: [c1 , c2]}});
    if(result){
        console.log("the name of the listing : " + result.name);
        console.log(result);
    }else{
        console.log("no listings found with the result.");
    }
}

var createMultipleListing = async (client , listing) => {

    const result = await client.db("sample_location").collection("UsersAndLocations").insertMany(listing);
    console.log(result.insertedCount+" No. of documents inserted :");
    console.log(result.insertedIds);
    
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
