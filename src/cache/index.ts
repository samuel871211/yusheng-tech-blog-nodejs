import send from "send";
import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";

httpServer.removeAllListeners("request");
httpServer.on("request", function requestListener(req, res) {
  const url = new URL(`http://localhost:5000${req.url}`);
  const qsCase = url.searchParams.get("case") || "1";
  if (url.pathname === "/favicon.ico") return faviconListener(req, res);
  if (url.pathname === "/image.jpg" || url.pathname === "/example.txt") {
    // 印出訊息
    console.log("Request url:", req.url);
    console.log("Request headers:", req.headers);
    // Last-Modified + If-Modified-Since
    if (qsCase === "1") {
      const sendStream = send(req, url.pathname, {
        root: __dirname,
        etag: false,
        lastModified: true,
        cacheControl: true,
        maxAge: 5000,
        immutable: true,
      });
      res.once("finish", () => {
        console.log("Response headers:", res.getHeaders());
        console.log("Status code:", res.statusCode);
      });
      sendStream.pipe(res);
      return;
    }
    // ETag + If-None-Match
    if (qsCase === "2") {
      const sendStream = send(req, url.pathname, {
        root: __dirname,
        etag: true,
        lastModified: true,
        cacheControl: true,
        maxAge: 5000,
        immutable: true,
      });
      sendStream.pipe(res);
      return;
    }
    // must-revalidate
    if (qsCase === "3") {
      res.setHeader("Cache-Control", "public, max-age=5, must-revalidate");
      const sendStream = send(req, url.pathname, {
        root: __dirname,
        etag: true,
        lastModified: true,
        cacheControl: false,
      });
      sendStream.pipe(res);
      return;
    }
  }
  return notFoundListener(req, res);
});
