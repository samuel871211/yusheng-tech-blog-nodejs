import { request, STATUS_CODES } from "http";
import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";

httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);

  const method = req.method?.toLowerCase();
  if (req.url === "/200" && method === "get") {
    res.setHeader("Retry-After", 3);
    return res.end(STATUS_CODES[200]);
  }

  if (req.url === "/429" && method === "get") {
    res.setHeader("Retry-After", 3);
    return res.end(STATUS_CODES[429]);
  }

  if (req.url === "/503" && method === "get") {
    res.setHeader("Retry-After", 3);
    return res.end(STATUS_CODES[503]);
  }
  return notFoundListener(req, res);
});
