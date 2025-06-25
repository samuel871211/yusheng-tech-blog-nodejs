import { readFileSync } from "fs";
import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";
import { join } from "path";

const beforeunloadHTML = readFileSync(join(__dirname, "beforeunload.html"));
const metaRefreshHTML = readFileSync(join(__dirname, "metaRefresh.html"));
const javascriptRedirectHTML = readFileSync(
  join(__dirname, "javascriptRedirect.html"),
);

httpServer.removeAllListeners("request");
httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);

  // Refresh without url
  if (req.url === "/refresh-without-url") {
    res.setHeader("Refresh", "3");
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Your Request ID: ${crypto.randomUUID()}</h1>`);
    return;
  }
  // referrer
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
          <div>req.headers.referrer: ${req.headers.referer}</div>
          <div id="documentReferrer"></div>
          <script>
            document.getElementById("documentReferrer").innerText = "document.referrer: " + document.referrer
          </script>
        </body>
      </html>
    `);
    return;
  }
  // Refresh with javascript protocol
  if (req.url === "/javascript-protocol") {
    res.setHeader("Refresh", "0; url=javascript:alert(1)");
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Your Request ID: ${crypto.randomUUID()}</h1>`);
    return;
  }
  // HTTP redirect vs refresh
  if (req.url === "/http-redirect-vs-refresh") {
    res.statusCode = 301;
    res.setHeader("Location", "https://www.google.com");
    res.setHeader(
      "Refresh",
      "0; url=https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Reference/Status/301",
    );
    res.end();
    return;
  }
  // JavsScript redirect vs refresh
  if (req.url === "/javascript-redirect-vs-refresh") {
    res.setHeader("Refresh", "0; url=https://developer.mozilla.org");
    res.end(javascriptRedirectHTML);
    return;
  }
  // meta refresh vs refresh
  if (req.url === "/meta-refresh-vs-refresh") {
    res.setHeader("Refresh", "0; url=https://developer.mozilla.org");
    res.end(metaRefreshHTML);
    return;
  }
  // beforeunload
  if (req.url === "/beforeunload") {
    res.setHeader("Refresh", "3; url=https://www.google.com");
    res.end(beforeunloadHTML);
    return;
  }
  return notFoundListener(req, res);
});
