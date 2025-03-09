import { marked } from "marked";
import { Socket } from "net";
import httpServer from "../httpServer";
import { readFileSync } from "fs";
import { join } from "path";
import { faviconListener } from "../listeners/faviconListener";

let connectionCount = 0;
const sockets = new Set<Socket>();
const README = readFileSync(join(__dirname, "README.md")).toString();
const HTML = marked(README);

// 可修改
httpServer.keepAliveTimeout = 0;

httpServer.on('request', function day1Listener(req, res) {
  res.setHeader("Content-Type", "123\r\n123");
  res.end();
  return;
  if (req.url === '/favicon.ico') return faviconListener(req, res);
  if (req.url === '/') {
    // 以下兩行為本機開發用
    const README = readFileSync(join(__dirname, "README.md")).toString();
    const HTML = marked(README);

    res.setHeader('Content-Type', 'text/html; charset=UTF8');
    res.end(HTML);
    return;
  }
  if (req.url === '/close') {
    res.setHeader('Connection', 'close');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ connectionCount }));
    return;
  }
  if (req.url === '/keepAlive') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ connectionCount }));
    return;
  }
});
httpServer.on('connection', (socket) => {
  if (!sockets.has(socket)) {
    sockets.add(socket);
    connectionCount += 1;
  }
  socket.on('close', (hadError) => {
    if (sockets.has(socket)) {
      sockets.delete(socket);
      connectionCount -= 1;
    }
  });
});
