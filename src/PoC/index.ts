import { readFileSync } from "fs";
import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";
import { join } from "path";

httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  if (req.url === "/")
    return res.end(readFileSync(join(__dirname, "index.html")));
  if (req.url === "/blank-attachment") {
    res.setHeader("Content-Disposition", "inline");
    return res.end(readFileSync(join(__dirname, "blank-attachment.html")));
  }
  return notFoundListener(req, res);
});
