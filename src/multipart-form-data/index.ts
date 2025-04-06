import { readFileSync } from "fs";
import { join } from "path";
import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";

const indexHTML = readFileSync(join(__dirname, 'index.html'));

httpServer.on('request', function requestListener (req, res) {
  const method = String(req.method).toLowerCase();
  
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html; charset=utf8");
    res.end(indexHTML);
    return;
  }
  if (req.url === "/updateUser" && method === "post") {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => (chunks.push(chunk)));
    req.once('end', () => {
      const buffer = Buffer.concat(chunks);
      // binary 圖片轉成 utf8 字串會造成效能低落
      // const utf8String = buffer.toString('utf8');
      console.log(buffer);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ status: "ok" }));
      return;
    });
    return;
  }
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  return notFoundListener(req, res);
});