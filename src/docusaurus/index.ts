import { readFileSync } from "fs";
import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";
import { join } from "path";

const indexHTML = readFileSync(join(__dirname, "index.html"));

httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.end(indexHTML);
    return;
  }

  return notFoundListener(req, res);
});
