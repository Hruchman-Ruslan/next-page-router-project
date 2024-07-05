import { MongoClient } from "mongodb";

import { IComment } from "@/types/comments";

import { NextApiRequest, NextApiResponse } from "next";

const { MONGO_EVENTS } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const eventId = req.query.eventId as string;

  if (!MONGO_EVENTS) {
    throw new Error("MONGO_EVENTS environment variable is not defined");
  }

  const client = await MongoClient.connect(MONGO_EVENTS);

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newComment: IComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();

    const result = await db.collection("comments").insertOne(newComment);

    console.log(result);

    newComment.id = result.insertedId.toString();

    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Ruslan", text: "A first comment" },
      { id: "c2", name: "Manuel", text: "A second comment" },
    ];

    res.status(200).json({ comments: dummyList });
  }

  client.close();
}
