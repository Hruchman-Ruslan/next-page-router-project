import { MongoClient } from "mongodb";

import { NextApiRequest, NextApiResponse } from "next";

const MONGO_NEWSLETTER = process.env.MONGO_NEWSLETTER as string;

async function connectDatabase() {
  const client = await MongoClient.connect(MONGO_NEWSLETTER);

  return client;
}

async function insertedDocument(
  client: MongoClient,
  documents: { email: string }
) {
  const db = client.db();

  await db.collection("newsletter").insertOne({ email: documents });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "invalid email address" });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connected to the database failed!" });
      return;
    }

    try {
      await insertedDocument(client, { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
    }

    res.status(201).json({ message: "Signed Up!" });
  }
}
