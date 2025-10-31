import { readFileSync } from "fs";
import http2 from "http2";
import http from "http";
import { join } from "path";
import httpServer from "../httpServer";

// const http2Server = http2.createServer();
// http2Server.on('request', (req, res) => {
//     console.log(req.headers);
//     res.end('Welcome to HTTP/2 Server')
// })
// http2Server.listen(5001)

const https2Server = http2.createSecureServer({
  key: readFileSync(join(__dirname, "private-key.pem")),
  cert: readFileSync(join(__dirname, "cert.pem")),
});
https2Server.on("request", (req, res) => {
  console.log(req.headers);
  res.end("Welcome to HTTP/2 Server");
});
https2Server.on("connection", (socket) => {
  console.log("socket created");
});
https2Server.on("session", (session) => {
  console.log("session created");
});
https2Server.on("stream", (stream) => {
  console.log({ stream });
});
https2Server.listen(5002);

const clientHttp2Session1 = http2.connect("https://localhost:5002", {
  ca: readFileSync(
    "/Users/yusheng/Library/Application Support/mkcert/rootCA.pem",
  ),
});
const clientHttp2Session2 = http2.connect("https://localhost:5002", {
  ca: readFileSync(
    "/Users/yusheng/Library/Application Support/mkcert/rootCA.pem",
  ),
});
// clientHttp2Session1.con
// clientHttp2Session
//     .request({
//         [http2.constants.HTTP2_HEADER_PATH]: '/hello/world?test=123',
//         [http2.constants.HTTP2_HEADER_METHOD]: 'POST',
//         [http2.constants.HTTP2_HEADER_AUTHORITY]: 'localhost:5001',
//         [http2.constants.HTTP2_HEADER_HOST]: 'malicious.host'
//     })
//     .end()
//     .on('error', console.log)

httpServer.on("request", (req, res) => {
  console.log(req.headers);
  res.end("Welcome to HTTP/1.1 Server");
});
