import send from "send";
import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";

httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  if (req.url === "/image.jpg") {
    console.log(req.url);
    return send(req, String(req.url), {
      root: __dirname,
      cacheControl: true,
      etag: true,
      immutable: true,
      lastModified: true,
      maxAge: 60000,
    }).pipe(res);
  }
  return notFoundListener(req, res);
});
