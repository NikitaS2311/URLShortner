// import {readFile, writeFile, mkdir}  from "fs/promises";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const DATA_DIR = path.join(__dirname,"..", "data");
// const DATA_FILE = path.join(DATA_DIR, "links.json");
//  const VIEWS_DIR = path.join(__dirname, "..","views"); 

// // Load links
// export const loadLinks = async () => {
//   try {
//     const data = await readFile(DATA_FILE, "utf-8");
//     return JSON.parse(data);
//   } catch (error) {
//     if (error.code === "ENOENT") {
//       await writeFile(DATA_FILE, JSON.stringify({}));
//       return {};
//     }
//     throw error;
//   }
// };

// // Save links
// export const saveLinks = async (links) => {
//   await writeFile(DATA_FILE, JSON.stringify(links, null, 2));
// };

import { dbClient } from "../../config/db-client.js";
import{env} from "../../config/env.js";

const db = dbClient.db(env.MONGODB_DATABASE_NAME);
const shortenerCollection = db.collection("shorteners");
 
export const loadLinks = async()=>{
  return shortenerCollection.find({}).toArray();
};

export const saveLinks = async(link)=>{
  return shortenerCollection.insertOne(link);
}

export const getLinkByShortCode = async(shortcode)=>{
  return await shortenerCollection.findOne({shortCode:shortcode });
};