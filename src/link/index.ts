import { readFileSync } from "fs";
import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";
import { join } from "path";

httpServer.on("request", (req, res) => {
  const url = new URL(req.url || "", "http://localhost:5000");
  console.log(url);
  if (url.pathname === "/page2.js") {
    res.setHeader("content-type", "text/javascript");
    res.setHeader("Cache-Control", "public, max-age=60");
    res.end("console.log('hello world')");
    return;
  }
  if (url.pathname === "/") {
    res.setHeader("content-type", "text/html");
    res.end(readFileSync(join(__dirname, "index.html")));
    return;
  }
  if (url.pathname === "/page2") {
    res.setHeader("content-type", "text/html");
    res.end(readFileSync(join(__dirname, "page2.html")));
    return;
  }
  if (url.pathname === "/favicon.ico") return faviconListener(req, res);
  return notFoundListener(req, res);
});
