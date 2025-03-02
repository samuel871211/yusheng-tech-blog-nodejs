import { createServer } from 'http';
let connectionCount = 0;
const httpServer = createServer().listen(5000);
httpServer.on('request', (req, res) => {
    // https://github.com/nodejs/node/blob/main/lib/_http_server.js
    // nodeJS httpServer 會自動根據 req.headers.connection 來決定
    // res.setHeader('Connection', 'close');

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