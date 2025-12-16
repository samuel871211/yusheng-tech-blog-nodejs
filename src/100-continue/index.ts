import { STATUS_CODES } from "http";

import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";
import { createSocket, sleep } from "../utils";

httpServer.on("checkContinue", function checkContinueListener(req, res) {
  // >= 1MB 就 reject
  if (parseInt(req.headers["content-length"] || "0") >= 1024 * 1024) {
    res.statusCode = 413;
    res.end(STATUS_CODES[413]);
    return;
  }
  // < 1MB，讀取 request body，並且原封不動寫入 response body
  res.writeContinue();
  const chunks: Buffer[] = [];
  req.on("data", (chunk) => chunks.push(chunk));
  req.on("end", () => res.end(Buffer.concat(chunks)));
});

httpServer.on("request", function requestListener(req, res) {
  const url = new URL(req.url || "/", "http://localhost:5000");
  if (url.pathname === "/") return res.end("ok");
  if (url.pathname === "/favicon.ico") return faviconListener(req, res);
  return notFoundListener(req, res);
});

// async function expect100Continue() {
//   const url = new URL("http://localhost:5000");
//   const socket = await createSocket(url);
//   socket.write(`GET / HTTP/1.1
// Host: localhost:5000
// Expect: 100-continue
// Content-Length: 3

// `.replaceAll("\n", "\r\n"));
//   socket.on("data", (chunk) => console.log(chunk.toString('utf8')));
//   // 延遲兩秒再送 request body (實務上應該是收到 100 Continue 就可以開始發送)
//   await sleep(2000);
//   socket.write('123');
// }

// expect100Continue();
