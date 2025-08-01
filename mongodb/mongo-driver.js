import {MongoClient} from "mongodb";
const client = new MongoClient("mongodb://localhost:27017/")
await client.connect();
const db = client.db('mongodb_nodejs_db') // Creating database
const usercollection = db.collection("users");

//usercollection.insertOne({name :"Nikita", age: 21});
export default db;