import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";

httpServer.on("request", (req, res) => {
  const url = new URL(req.url || "", "http://localhost:5000");
  const sleepMs = parseInt(url.searchParams.get("sleepMs") || "0");
  if (url.pathname === "/") {
    return setTimeout(() => {
      if (!res.writableEnded) return res.end(`sleepMs = ${sleepMs}`);
    }, sleepMs);
  }
  if (url.pathname === "/favicon.ico") return faviconListener(req, res);
  return notFoundListener(req, res);
});
