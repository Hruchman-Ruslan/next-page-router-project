import { MongoClient } from "mongodb";

import { NextApiRequest, NextApiResponse } from "next";

const { MONGO_URI } = process.env;

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

    if (!MONGO_URI) {
      res
        .status(500)
        .json({ message: "MongoDB connection string is not defined" });
      return;
    }

    try {
      const client = await MongoClient.connect(MONGO_URI);
      const db = client.db();

      await db.collection("emails").insertOne({ email: userEmail });

      client.close();

      res.status(201).json({ message: "Signed Up!" });
    } catch (error) {
      res.status(500).json({ message: "Error connecting to the database" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
