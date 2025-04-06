import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { readFileSync } from "fs";
import { join } from "path";

const image = readFileSync(join(__dirname, 'image.jpg'));
httpServer.on('request', function requestListener (req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  res.setHeader("Content-Type", "text/plain");
  console.log(image.buffer.slice(0, 4));
  res.end(image);
});