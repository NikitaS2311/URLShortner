import {readFile, writeFile, mkdir}  from "fs/promises";
import fs from "fs";
import crypto from "crypto";
import path from "path";
import {Router} from "express";
import {postURLShortener,getShortenerPage,redirectToShortLink} from "../controllers/postshortener.controller.js";


import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();


// Serve form & shortened URLs list
router.get("/", getShortenerPage);
//Making Controller to handle the route
router.post("/", postURLShortener);

// Handle short URL redirection
router.get("/:shortCode",redirectToShortLink);



// default way if the project is small and one router is used
export default router;

//Named exports, when there are multiple routers
export const shortenedRoutes = router;