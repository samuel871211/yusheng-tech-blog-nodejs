import send from "send";
import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";

httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  if (req.url === "/example.txt") {
    return send(req, String(req.url), { root: __dirname }).pipe(res);
  }
  return notFoundListener(req, res);
});

httpServer.on("connect", function connectListener(req, socket, head) {
  console.log({
    url: req.url,
    method: req.method,
    headers: req.headers,
    head: head.toString("utf8"),
  });
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
  socket.destroy();
  return;
});
