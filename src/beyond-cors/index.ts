import { readFileSync } from "fs";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";
import { http5000Server, http5001Server } from "./httpServers";
import { join } from "path";

const indexHTML = readFileSync(join(__dirname, "index.html"));
const docusaurusHTML = readFileSync(join(__dirname, "docusaurus.html"));

http5000Server.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  // if (req.url === "/") {
  //   res.setHeader("Content-Type", "text/html");
  //   res.end(indexHTML);
  //   return;
  // }
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.end(docusaurusHTML);
    return;
  }
  return notFoundListener(req, res);
});

http5001Server.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);

  if (req.url === "/style.css") {
    res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
    res.setHeader("Content-Type", "text/css");
    res.end("123");
    return;
  }
  if (req.url === "/image.png") {
    res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
    res.setHeader("Content-Type", "image/png");
    res.end("123");
    return;
  }
  if (req.url === "/script.js") {
    res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
    res.setHeader("Content-Type", "text/javascript");
    res.end("123");
    return;
  }
  if (req.url === "/video.mp4") {
    res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
    res.setHeader("Content-Type", "video/mp4");
    res.end("123");
    return;
  }
  if (req.url === "/audio.aac") {
    res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
    res.setHeader("Content-Type", "audio/aac");
    res.end("123");
    return;
  }
  if (req.url === "/with-corp.html") {
    res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
    res.setHeader("Content-Type", "text/html");
    res.end("123");
    return;
  }
  if (req.url === "/with-x-frame-options.html") {
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Content-Type", "text/html");
    res.end("123");
    return;
  }
  if (req.url === "/with-csp-frame-ancestors.html") {
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
    res.setHeader("Content-Type", "text/html");
    res.end("123");
    return;
  }

  return notFoundListener(req, res);
});
