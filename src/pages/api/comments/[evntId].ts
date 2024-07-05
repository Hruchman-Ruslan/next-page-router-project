import { IComment } from "@/types/comments";

import { NextApiRequest, NextApiResponse } from "next";

import {
  connectDatabase,
  getAllDocuments,
  insertedDocument,
} from "@/helpers/db-util";

const MONGO_EVENTS = process.env.MONGO_EVENTS as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const eventId = req.query.eventId as string;

  let client;

  try {
    client = await connectDatabase(MONGO_EVENTS);
  } catch (error) {
    res.status(500).json({ message: "Connected to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newComment: IComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertedDocument(client, "comments", newComment);
      const insertedComment: IComment = {
        ...newComment,
        _id: result.insertedId,
      };

      res
        .status(201)
        .json({ message: "Added comment.", comment: insertedComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed!" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed!" });
    }
  }

  client.close();
}
