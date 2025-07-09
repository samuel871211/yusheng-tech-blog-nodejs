import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";
import { http5000Server, http5001Server } from "./httpServers";

http5000Server.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.end("<img src='http://localhost:5001/embed.html'/>");
    return;
  }
  if (req.url === "/embed.html") {
    res.setHeader("Cross-Origin-Resource-Policy", "text/html");
  }
  return notFoundListener(req, res);
});

http5001Server.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  if (req.url === "/embed.html") {
    res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>hello world</h1>");
    return;
  }
  return notFoundListener(req, res);
});
