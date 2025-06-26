import express from "express";
 import {readFile, writeFile, mkdir}  from "fs/promises";
// import fs from "fs";
// import crypto from "crypto";
import path from "path";


import { fileURLToPath } from "url";
import {shortenedRoutes} from "./urlshortener/routes/shortener.routes.js"

const app = express();
const PORT = process.env.port||3000;

// Required for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
// const DATA_DIR = path.join(__dirname,"urlshortener", "data");
// const DATA_FILE = path.join(DATA_DIR, "links.json");
// const VIEWS_DIR = path.join(__dirname, "urlshortener","views");

// Middleware
app.use(express.static(path.join(__dirname, "urlshortener","public")));
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json()); // for JSON body

//Here, we're using template engine(ejs)

app.set("view engine", "ejs"); // which template engine we'are using that ejs
app.set('views', path.join(__dirname,'urlshortener', 'views'));






app.use(shortenedRoutes);

// Create data directory if not exists
//await mkdir(DATA_DIR, { recursive: true });


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
