import { readFileSync } from "fs";
import { http5000Server, http5001Server } from "./httpServers";
import { join } from "path";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";

// 為了開發方便，每次 request 都去讀取 static html

http5000Server.removeAllListeners("request");
http5000Server.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.end(readFileSync(join(__dirname, "5000.html")));
  }
  if (req.url === "/welcome") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.end(readFileSync(join(__dirname, "5000welcome.html")));
  }
  if (req.url === "/embed5001") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.end(readFileSync(join(__dirname, "5000embed5001.html")));
  }
  if (req.url === "/DENY+self") {
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
    return res.end(readFileSync(join(__dirname, "5000DENY+self.html")));
  }
  if (req.url === "/sandbox") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.end(readFileSync(join(__dirname, "5000sandbox.html")));
  }
  if (req.url === "/download") {
    res.setHeader("Content-Type", "text/javascript");
    res.setHeader("Content-Disposition", "attachment; filename=download.js");
    return res.end(readFileSync(join(__dirname, "download.js")));
  }
  return notFoundListener(req, res);
});

http5001Server.removeAllListeners("request");
http5001Server.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.end(readFileSync(join(__dirname, "5001.html")));
  }
  if (req.url === "/SAMEORIGIN") {
    console.log(req.url);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    return res.end(readFileSync(join(__dirname, "5001SAMEORIGIN.html")));
  }
  if (req.url === "/DENY") {
    console.log(req.url);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("X-Frame-Options", "DENY");
    return res.end(readFileSync(join(__dirname, "5001DENY.html")));
  }
  if (req.url === "/self") {
    console.log(req.url);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
    return res.end(readFileSync(join(__dirname, "5001self.html")));
  }
  if (req.url === "/none") {
    console.log(req.url);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
    return res.end(readFileSync(join(__dirname, "5001none.html")));
  }
  if (req.url === "/frame-ancestors-5000") {
    console.log(req.url);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader(
      "Content-Security-Policy",
      "frame-ancestors http://localhost:5000",
    );
    return res.end(
      readFileSync(join(__dirname, "5001frame-ancestors-5000.html")),
    );
  }
  return notFoundListener(req, res);
});
