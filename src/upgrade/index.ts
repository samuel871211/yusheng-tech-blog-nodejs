import httpServer from "../httpServer";
import WebSocket from "ws";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";
import { readFileSync } from "fs";
import { join } from "path";

// 範例1: Simple server
const wss = new WebSocket.Server({ port: 80 });
const indexHTML = readFileSync(join(__dirname, "index.html"));
wss.on("connection", function onConnection(websokcet, req) {
  websokcet.on("open", function onOpen() {
    console.log("open");
  });
  websokcet.on("close", function onClose() {
    console.log("close");
  });
  websokcet.on("message", function onMessage(data, isBinary) {
    console.log({ data: data.toString(), isBinary });
    websokcet.send("data received");
  });
});
httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(indexHTML);
    return;
  }
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  return notFoundListener(req, res);
});

// 範例2: Multiple servers sharing a single HTTP/S server
// httpServer.on('upgrade', function upgradeListener (req, socket, head) {
//   console.log('upgrade')
//   console.log(req.url);
//   console.log(req.headers);
//   console.log(head);
//   socket.end();
//   wss.handleUpgrade(req, socket, head, (websocket, req) => {})
//   return;
// })

// httpServer.on('request', function requestListener (req, res) {
//   console.log('request');
//   console.log(req.url);
//   console.log(req.headers);
//   res.end();
//   return;
// })
