import { createServer } from 'http';

const httpServer = createServer();
httpServer.on('request', (req, res) => {
    console.log(req);
    console.log(res);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true }));
});
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
httpServer.on("connect", (req, socket, head) => {
    console.log("connect", req, socket, head);
    socket.end(JSON.stringify({ success: true }));
});
// httpServer.on("dropRequest", (req, socket) => {
//     console.log("dropRequest", req, socket);
// });
// httpServer.on("upgrade", (req, socket, head) => {
//     console.log("upgrade", req, socket, head);
// });
httpServer.listen(5000);