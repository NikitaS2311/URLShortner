import crypto from 'crypto';
import { loadLinks, saveLinks } from '../models/shortener.model.js';
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VIEWS_DIR = path.join(__dirname, "..", "views");



export const  getShortenerPage = async (req, res) => {
  try {
    const links = await loadLinks();
    //const fileContent = await readFile(path.join(VIEWS_DIR, "index.html"), "utf-8");

  //   const listItems = Object.entries(links)
  //     .map(
  //       ([shortCode, url]) =>{
  //           url = url.length >= 30 ?`$url.slice(0,30)}...`:url;

        
  //       return `<li><a href="/${shortCode}" target="_blank">${req.get("host")}/${shortCode}</a> → ${url}</li>`
  // })
  //     .join("");

    // const content = fileContent.replace("{{shortened_urls}}", listItems);

    // res.send(content);
 res.render("index", { links, host: req.host });

  } catch (error) {
    console.error("GET / error:", error);
    res.status(500).send("Internal Server Error");
  }
}


export const postURLShortener =  async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

    const links = await loadLinks();

    if (links[finalShortCode]) {
      return res.status(400).send("Short code already exists. Choose another.");
    }

    links[finalShortCode] = url;
    await saveLinks(links);

    res.redirect("/");
  } catch (error) {
    console.error("POST / error:", error);
    res.status(500).send("Internal Server Error");
  }
};


export const redirectToShortLink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const links = await loadLinks();

    if (links[shortCode]) {
      return res.redirect(links[shortCode]);
    } else {
      return res.status(404).send("Short URL not found");
    }
  } catch (error) {
    console.error("GET /:shortCode error:", error);
    res.status(500).send("Internal Server Error");
  }
}