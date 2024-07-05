import { MongoClient } from "mongodb";

import { IComment } from "@/types/comments";

import { NextApiRequest, NextApiResponse } from "next";

const MONGO_EVENTS = process.env.MONGO_EVENTS as string;

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

    const insertedComment: IComment = {
      ...newComment,
      _id: result.insertedId,
    };

    res
      .status(201)
      .json({ message: "Added comment.", comment: insertedComment });
  }

  if (req.method === "GET") {
    const db = client.db();

    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    console.log(documents);

    res.status(200).json({ comments: documents });
  }

  client.close();
}
