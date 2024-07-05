import { Filter, MongoClient, Sort } from "mongodb";

export async function connectDatabase(connectionString: string) {
  const client = await MongoClient.connect(connectionString);

  return client;
}

export async function insertedDocument(
  client: MongoClient,
  collection: string,
  documents: { email: string }
) {
  const db = client.db();

  const result = await await db
    .collection(collection)
    .insertOne({ email: documents });

  return result;
}

export async function getAllDocuments(
  client: MongoClient,
  collection: string,
  sort: Sort,
  filter: Filter<any>
) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}
