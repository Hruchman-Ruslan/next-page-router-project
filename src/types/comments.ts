import { ObjectId } from "mongodb";

export interface IComment {
  _id?: ObjectId;
  email: string;
  name: string;
  text: string;
  eventId: string;
}
