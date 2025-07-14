import send from "send";
import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";

httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  if (req.url === "/image.jpg" || req.url === "/example.txt") {
    console.log(req.url);
    const sendStream = send(req, String(req.url), {
      root: __dirname,
      // cacheControl: true,
      // immutable: true,
      // maxAge: 1000,
      etag: true,
      lastModified: true,
      cacheControl: false,
    });
    res.setHeader("Cache-Control", "public, max-age=5, must-revalidate");
    sendStream.pipe(res);
    return;
  }
  return notFoundListener(req, res);
});
