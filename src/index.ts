import { createServer } from 'http';
let connectionCount = 0;
const httpServer = createServer().listen(5000);

// HTTP 1.1 HOL blocking
// 瀏覽器 console 執行
// 此情境需要建立 2 個 TCP Connection
// This means that browsers are limited in the number of resources
// that they can download and render at the same time
// which has typically been limited to 6 parallel connections.
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#http2_messages
// fetch('http://localhost:5000');
// fetch('http://localhost:5000');

httpServer.on('request', (req, res) => {
    // https://github.com/nodejs/node/blob/main/lib/_http_server.js
    // nodeJS httpServer 會自動根據 req.headers.connection 來決定
    // res.setHeader('Connection', 'close');
    
    // Start Line
    // HTTP/1.1 ${statusCode} ${statusMessage}
    // https://github.com/nodejs/node/blob/main/lib/_http_server.js#L413
    res.statusCode = 200;
    res.statusMessage = "Custom Status Message of 200";

    // HTTP uses \r\n to seperate lines
    // Setting statusMessage with \r\n will cause nodejs http module to throw ERR_INVALID_CHAR
    // https://github.com/nodejs/node/blob/main/lib/_http_server.js#L410
    // res.statusMessage = "Evil Status Message contains \r\n";

    // 需自行設定
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true }));
});

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Keep-Alive
httpServer.on('connection', (socket) => {
    connectionCount += 1;
    console.log('connection', connectionCount);
    socket.on('close', (hadError) => console.log('socket close', { hadError }));
});
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