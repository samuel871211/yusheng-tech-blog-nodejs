// import { readFileSync } from "fs";
// import { join } from "path";
import { parse } from "url";
import httpServer from "./httpServer";
import { faviconListener } from "./listeners/faviconListener";
import { rootListener } from "./listeners/rootListener";
import { notFoundListener } from "./listeners/notFoundlistener";

// TODO 整理到各個資料夾

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