const { MongoClient } = require("mongodb");

const uri = "";
const client = new MongoClient(uri);
const collection = client.db("test").collection("test");

async function check(value) {
    const findResult = await collection.find({address: value});

    if (findResult != null){
        console.log(`The address "`+ value + `" was already in the database`,);
        return true;
    }
    console.log(`The address "`+ value + `" was already in the database`,);
}

async function post(address){
    const doc = { address: address, isBlacklisted: true };
    //TODO: Not necessary but, check if address is already in the db

    const result = await collection.insertOne(doc);
    if (result != null){
        console.log(
            `A document was inserted with the _id: ${result.insertedId}`,);
        return true;
    }
}

/*
  console.log(post("100").catch(console.dir));
  console.log(post("300").catch(console.dir));
  console.log(post("500").catch(console.dir));
  console.log(check("500").catch(console.dir));
*/
