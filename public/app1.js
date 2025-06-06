import { createServer } from 'http';
import { readFile, writeFile, mkdir } from 'fs/promises';
import crypto from "crypto";
import path from 'path';
import { fileURLToPath } from 'url';

// Required for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3002;
const DATA_FILE = path.join(__dirname,  "data", "links.json")

// Serve static file function
const serveFile = async (res, filePath, contentType) => {
    try {
        const data = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - File Not Found');
    }
};

const loadLinks = async () => {
    try{
        const data = await readFile(DATA_FILE,'utf-8');
        return JSON.parse(data);
    }catch (error){
        if(error.code === "ENOENT"){
            await writeFile(DATA_FILE, JSON.stringify({}));
            return {};
        }
        throw error;
    }
};
const saveLinks = async(links) =>{
    await writeFile(DATA_FILE, JSON.stringify(links));
};

(async () => {
    await mkdir(path.join(__dirname, "data"), { recursive: true });

// Create server
const server = createServer(async (req, res) => {
    console.log(req.url);

    if (req.method === "GET") {
        if (req.url === "/") {
            return serveFile(res, path.join(__dirname,  "index.html"), "text/html");
        } else if (req.url === "/style.css") {
            return serveFile(res, path.join(__dirname, "style.css"), "text/css");
        } else if (req.url === "/favicon.ico") {
            res.writeHead(204); // No Content
            return res.end();

        } else if(req.url == "/links"){
            const links = await loadLinks();
            res.writeHead(200, {"Content-Type": "application/json"})
            return res.end(JSON.stringify(links)) 
        }
        else {
            // res.writeHead(404, { 'Content-Type': 'text/html' });
            // res.end('404 - Page Not Found');
            const links = await loadLinks();
            // to get the short code from links.json
            const shortCode = req.url.slice(1);
            console.log("links redirect", req.url);
            if(links[shortCode]){
               res.writeHead(302, {location: links[shortCode]});
               return res.end(); 
            }
            res.writeHead(404, {"Content-Type": "text/plain"});
             return res.end("Shortened URL is not found");

    
            }
        }
    if( req.method === "POST" && req.url === "/shorten"){
        //TODO- To get assess that of the file to check whether duplicate data exist or not
        const links = await loadLinks();
        let body  = "";
        req.on("data", (chunk)=>(body += chunk));

        req.on("end", async() =>{
            console.log(body);
            const{url , shortCode} = JSON.parse(body);
            if(!url){
                res.writeHead(400, {"Content-Type":"text/plain"});
                return res.end("URL is required"); 
            }
            //TODO- No duplicate data exists
            const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
            if(links[finalShortCode]){
                res.writeHead(400, {"Content-Type":"text/plain"});
                return res.end("Short code already exists. Please choose another");
            }


            //TODO- To add data to links.json File
            links[finalShortCode] = url;

            await saveLinks(links);
            res.writeHead(200, { "Content-Type": "application/json" });

                res.end(JSON.stringify({success: true, shortCode : finalShortCode}));
        }); 
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);

});
})();
