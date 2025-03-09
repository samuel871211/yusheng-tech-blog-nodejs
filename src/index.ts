// import { day1Listener } from './day1';
// import { day2Listener } from './day2';
// import { day3Listener } from './day3';
// import { day4Listener } from './day4';
// import { day5Listener } from './day5';
// import { day6Listener } from './day6';
// import { day7Listener } from './day7';
// import { day8Listener } from './day8';
// import { day9Listener } from './day9';
// import { day10Listener } from './day10';
// import { day11Listener } from './day11';
// import { day12Listener } from './day12';
// import { day13Listener } from './day13';
// import { day14Listener } from './day14';
// import { day15Listener } from './day15';
// import { day16Listener } from './day16';
// import { day17Listener } from './day17';
// import { day18Listener } from './day18';
// import { day19Listener } from './day19';
// import { day20Listener } from './day20';
// import { day21Listener } from './day21';
// import { day22Listener } from './day22';
// import { day23Listener } from './day23';
// import { day24Listener } from './day24';
// import { day25Listener } from './day25';
// import { day26Listener } from './day26';
// import { day27Listener } from './day27';
// import { day28Listener } from './day28';
// import { day29Listener } from './day29';
// import { day30Listener } from './day30';
// import { readFileSync } from "fs";
// import { join } from "path";
import httpServer from "./httpServer";
import { faviconListener } from "./listeners/faviconListener";
import { rootListener } from "./listeners/rootListener";
import { notFoundListener } from "./listeners/notFoundlistener";
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
//     // if (url === "/day1") return day1Listener(req, res);
//     // if (url === "/day2") return day2Listener(req, res);
//     // if (url === "/day3") return day3Listener(req, res);
//     // if (url === "/day4") return day4Listener(req, res);
//     // if (url === "/day5") return day5Listener(req, res);
//     // if (url === "/day6") return day6Listener(req, res);
//     // if (url === "/day7") return day7Listener(req, res);
//     // if (url === "/day8") return day8Listener(req, res);
//     // if (url === "/day9") return day9Listener(req, res);
//     // if (url === "/day10") return day10Listener(req, res);
//     // if (url === "/day11") return day11Listener(req, res);
//     // if (url === "/day12") return day12Listener(req, res);
//     // if (url === "/day13") return day13Listener(req, res);
//     // if (url === "/day14") return day14Listener(req, res);
//     // if (url === "/day15") return day15Listener(req, res);
//     // if (url === "/day16") return day16Listener(req, res);
//     // if (url === "/day17") return day17Listener(req, res);
//     // if (url === "/day18") return day18Listener(req, res);
//     // if (url === "/day19") return day19Listener(req, res);
//     // if (url === "/day20") return day20Listener(req, res);
//     // if (url === "/day21") return day21Listener(req, res);
//     // if (url === "/day22") return day22Listener(req, res);
//     // if (url === "/day23") return day23Listener(req, res);
//     // if (url === "/day24") return day24Listener(req, res);
//     // if (url === "/day25") return day25Listener(req, res);
//     // if (url === "/day26") return day26Listener(req, res);
//     // if (url === "/day27") return day27Listener(req, res);
//     // if (url === "/day28") return day28Listener(req, res);
//     // if (url === "/day29") return day29Listener(req, res);
//     // if (url === "/day30") return day30Listener(req, res);
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