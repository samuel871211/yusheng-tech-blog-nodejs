import httpServer from "../httpServer";
import send from "send";
import { notFoundListener } from "../listeners/notFoundlistener";

httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/article.txt") {
    res.setHeader("Content-Type", "text/plain");
    return send(req, String(req.url), {
      acceptRanges: true,
      cacheControl: false,
      etag: false,
      lastModified: false,
      root: __dirname,
    }).pipe(res);
  }
  return notFoundListener(req, res);
});
