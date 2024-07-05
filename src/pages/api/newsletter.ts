import { NextApiRequest, NextApiResponse } from "next";

import { connectDatabase, insertedDocument } from "@/helpers/db-util";

const MONGO_NEWSLETTER = process.env.MONGO_NEWSLETTER as string;

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
      client = await connectDatabase(MONGO_NEWSLETTER);
    } catch (error) {
      res.status(500).json({ message: "Connected to the database failed!" });
      return;
    }

    try {
      await insertedDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
    }

    res.status(201).json({ message: "Signed Up!" });
  }
}
