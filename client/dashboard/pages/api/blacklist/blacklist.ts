// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

const uri =
  "mongodb+srv://admin:admin@cluster0.cozjs5f.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const collection = client.db("test").collection("test");

async function listOfBlacklistedEntries() {
  collection.find({ isBlacklisted: true }).toArray(function (err, docs) {
    return docs;
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { address },
    _method,
  } = req;
  console.log("hi");
  const list = await listOfBlacklistedEntries();
  res.status(200).json({ list: list });
}
