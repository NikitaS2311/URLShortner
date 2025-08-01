
import { MongoClient } from "mongodb";
import { env } from "./env.js";

const dbClient = new MongoClient(env.MONGODB_URI);
await dbClient.connect();

export { dbClient };
