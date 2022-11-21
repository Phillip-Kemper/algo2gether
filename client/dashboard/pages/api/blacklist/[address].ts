// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

const uri =
  "mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]";
const client = new MongoClient(uri);
const collection = client.db("test").collection("test");

async function isBlackListed(address) {
  const findResult = await collection.find({ address: address });

  if (findResult != null) {
    console.log(`The address "` + address + `" was already in the database`);
    return true;
  }
  console.log(`The address "` + address + `" was already in the database`);
}

async function addToBlackListAddress(address) {
  const doc = { address: address, isBlacklisted: true };
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { address },
    _method,
  } = req;
  console.log("hi");
  await addToBlackListAddress(address?.toString() || "");
  res.status(200);
}
