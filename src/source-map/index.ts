import { readFileSync } from "fs";
import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { join } from "path";

const js = readFileSync(join(__dirname, "add.js"));
const jsMap = readFileSync(join(__dirname, "add.js.map"));

httpServer.removeAllListeners("request");
httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  if (req.url === "/add.js") {
    res.setHeader("Content-Type", "text/javascript");
    res.setHeader("SourceMap", "add.js.map");
    res.end(js);
    return;
  }
  if (req.url === "/add.js.map") {
    console.log(req.url);
    res.setHeader("Content-Type", "application/json");
    res.end(jsMap);
    return;
  }
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.end('<script src="http://localhost:5000/add.js"></script>');
  }
});
