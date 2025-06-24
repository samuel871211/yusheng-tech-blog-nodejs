import { readFileSync } from "fs";
import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";
import { join } from "path";

const beforeunload = readFileSync(join(__dirname, "beforeunload.html"));
const metaRefresh = readFileSync(join(__dirname, "metaRefresh.html"));

httpServer.removeAllListeners("request");
httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  if (req.url === "/") {
    res.setHeader("Refresh", "3; url=http://localhost:5000/refreshed");
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Your Request ID: ${crypto.randomUUID()}</h1>`);
    return;
  }
  if (req.url == "/refreshed") {
    res.setHeader("Content-Type", "text/html");
    res.end(`
            <html>
                <head></head>
                <body>
                    <pre>${JSON.stringify(req.headers, null, 2)}</pre>
                    <code>document.referrer: </code>
                </body>
            </html>
        `);
  }
  return notFoundListener(req, res);
});
