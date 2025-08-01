// import dotenv from 'dotenv';
// dotenv.config();

// ✅ THEN import env validation (after dotenv.config)
import { env } from './config/env.js';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { shortenedRoutes } from './urlshortener/routes/shortener.routes.js';
// ✅ Setup __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Initialize app
const app = express();
const PORT = env.PORT; // use Zod-validated port

// ✅ Middleware
app.use(express.static(path.join(__dirname, "urlshortener", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ EJS template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "urlshortener", "views"));

// ✅ Route handler
app.use(shortenedRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
