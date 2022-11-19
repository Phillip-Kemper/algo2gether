const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://admin:admin@cluster0.cozjs5f.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const collection = client.db("test").collection("test");

export async function isBlackListed(address) {
  const findResult = await collection.find({ address: address });

  if (findResult != null) {
    console.log(`The address "` + address + `" was already in the database`);
    return true;
  }
  console.log(`The address "` + address + `" was already in the database`);
}

export async function addToBlackListAddress(address) {
  const doc = { address: address, isBlacklisted: true };
  //TODO: Not necessary but, check if address is already in the db

  const result = await collection.insertOne(doc);
  if (result != null) {
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return true;
  }
}

/*
  console.log(post("100").catch(console.dir));
  console.log(post("300").catch(console.dir));
  console.log(post("500").catch(console.dir));
  console.log(check("500").catch(console.dir));
*/
