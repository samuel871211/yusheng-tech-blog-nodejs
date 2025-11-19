import { createServer, RequestListener } from "node:http";
import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const requestListener: RequestListener = (req, res) => {
  const url = new URL(req.url || "", "http://localhost:5000");
  const sleepMs = parseInt(url.searchParams.get("sleepMs") || "0");
  if (url.pathname === "/") {
    return setTimeout(() => {
      if (!res.writableEnded) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.end(`sleepMs = ${sleepMs}`);
      }
    }, sleepMs);
  }
  if (url.pathname === "/index.html")
    return res.end(readFileSync(join(__dirname, "index.html")));
  if (url.pathname === "/favicon.ico") return faviconListener(req, res);
  return notFoundListener(req, res);
};
httpServer.on("request", requestListener);

createServer().listen(5001).on("request", requestListener);
