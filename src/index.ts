// import { readFileSync } from "fs";
// import { join } from "path";
import { parse } from "url";
import httpServer from "./httpServer";
import { faviconListener } from "./listeners/faviconListener";
import { rootListener } from "./listeners/rootListener";
import { notFoundListener } from "./listeners/notFoundlistener";

// 使用 socket 自行處理 raw http
// 若沒處理好，則會造成 CRLF Injection !!!
httpServer.on('request', function requestListener(req, res) {
  if (!res.socket) return res.end();
  
  // parse request url
  const parseQueryString = true;
  const urlWithParsedQuery = parse(req.url || "", parseQueryString);
  const { redirect } = urlWithParsedQuery.query;

  // setup 302 redirect
  if (typeof redirect === "string" && redirect.startsWith('http://localhost:5000')) {
    res.socket.write('HTTP/1.1 302 Found\r\n');
    res.socket.write('Connection: Close\r\n');
    // CRLF Injection Vulnerability
    // encodeURIComponent("http://localhost/test/r/nMalicious: Injected") => http%3A%2F%2Flocalhost%2Ftest%2Fr%2FnMalicious%3A%20Injected
    // Malicious Input: http://localhost:5000/?redirect=http%3A%2F%2Flocalhost%3A5000%2Ftest%0D%0AMalicious%3A%20Injected
    res.socket.write(`Location: ${redirect}\r\n`);
    res.socket.write('\r\n');
    res.socket.end();
    res.socket.destroy();
    return;
  }

  // 顯示 pathname
  const responseHTML = urlWithParsedQuery.pathname || "";
  res.socket.write('HTTP/1.1 200 OK\r\n');
  res.socket.write('Content-Type: text/html\r\n');
  res.socket.write('Connection: Close\r\n');
  res.socket.write(`Content-Length: ${responseHTML.length}\r\n`);
  res.socket.write('\r\n');
  res.socket.write(responseHTML);
  res.socket.end();
  res.socket.destroy();
})

// 測試 referer
// httpServer.on('request', (req, res) => {
//   console.log(req.headers.referer);
//   res.setHeader("Content-Type", "text/html");
//   res.end(`<!DOCTYPE html>
// <html>
//   <head>
//       <meta name="referrer" content="origin" />
//   </head>
//   <body>
//       <a href="http://localhost:5000/" target="_blank" referrerpolicy="unsafe-url">google</a>
//       <a href="http://localhost:5000/" target="_blank" rel="noreferrer">google</a>
//       <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" referrerpolicy="no-referrer" />
//       <script src="https://unpkg.com/react@18/umd/react.development.js" referrerpolicy="no-referrer"></script>
//   </body>
// </html>`);
// });

// import { createServer } from "http2";
// const http2Server = createServer().listen(5001);
// http2Server.on('stream', (stream, headers) => {
//     stream.respond({
//         ':status': 200,
//         'content-type': 'text/plain'
//     });
//     stream.end('ok');
// });

// const indexHTML = readFileSync(join(__dirname, 'index.html'));
// let connectionCount = 0;

// HTTP 1.1 HOL blocking
// 瀏覽器 console 執行
// 此情境需要建立 2 個 TCP Connection
// This means that browsers are limited in the number of resources
// that they can download and render at the same time
// which has typically been limited to 6 parallel connections.
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#http2_messages
// fetch('http://localhost:5000');
// fetch('http://localhost:5000');

// httpServer.keepAliveTimeout = 0;
// httpServer.maxRequestsPerSocket = 1;
// httpServer.on('request', (req, res) => {
//     setTimeout(() => { res.end("ok") }, 2000);

//     // const url = req.url?.toLowerCase();
//     // if (url === "/favicon.ico") return faviconListener(req, res);
//     // res.end("ok");
//     // res.end(String(connectionCount));
//     // return;
//     // if (url === "/") return rootListener(req, res);
//     // return notFoundListener(req, res);

//     // https://github.com/nodejs/node/blob/main/lib/_http_server.js
//     // nodeJS httpServer 會自動根據 req.headers.connection 來決定
//     // res.setHeader('Connection', 'close');
    
//     // Start Line
//     // HTTP/1.1 ${statusCode} ${statusMessage}
//     // https://github.com/nodejs/node/blob/main/lib/_http_server.js#L413
//     // res.statusCode = 200;
//     // res.statusMessage = "Custom Status Message of 200";

//     // HTTP uses \r\n to seperate lines
//     // Setting statusMessage with \r\n will cause nodejs http module to throw ERR_INVALID_CHAR
//     // https://github.com/nodejs/node/blob/main/lib/_http_server.js#L410
//     // res.statusMessage = "Evil Status Message contains \r\n";

//     // 需自行設定
//     // res.setHeader('Content-Type', 'application/json');
//     // res.end(JSON.stringify({ success: true }));
// });

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Keep-Alive
// httpServer.on('connection', (socket) => {
//     console.log('connection');
//     // socket.setTimeout()
//     // socket.setKeepAlive(false);
//     // connectionCount += 1;
//     // console.log('connection', connectionCount);
//     // socket.on('close', (hadError) => console.log('socket close', { hadError }));
// });
// httpServer.on("dropRequest", (req, socket) => {
//     console.log("dropRequest", req, socket);
// });
// httpServer.on("upgrade", (req, socket, head) => {
//     console.log("upgrade", req, socket, head);
// });
// httpServer.on("close", () => {
//     console.log("close");
// });
// httpServer.on("connection", (socket) => {
//     console.log("connection", socket);
//     socket.end();
// })
// httpServer.on("error", (err) => {
//     console.log("error", err);
// })
// httpServer.on("listening", () => {
//     console.log("listening");
// })
// httpServer.on("checkContinue", (req, res) => {
//     console.log("checkContinue")
// })
// httpServer.on("checkExpectation", (req, res) => {
//     console.log("checkExpectation")
// })
// httpServer.on("clientError", (err, socket) => {
//     console.log("clientError", err, socket);
// });