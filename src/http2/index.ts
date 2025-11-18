import { readFileSync } from "fs";
import http2 from "http2";
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
// https2Server.maxConnections = 1
https2Server.updateSettings({ maxConcurrentStreams: 2 });
https2Server.on("request", (req, res) => {
  // setTimeout(() => res.end("Welcome to HTTP/2 Server"), 1000)
  // console.log(req.headers);
  // res.writeHead(200, { connection: 'keep-alive' });
  res.end("Welcome to HTTP/2 Server");
});
https2Server.on("remoteSettings", (remoteSettings) => {
  console.log("remoteSettings received", remoteSettings);
});
https2Server.on("connection", (socket) => {
  console.log("socket created");
});
https2Server.on("session", (session) => {
  console.log("session created");
});
https2Server.on("stream", (stream) => {
  // setTimeout(() => {
  //   stream.respond();
  //   stream.end("Welcome to HTTP/2 Server");
  // }, 5000);
});
https2Server.on("sessionError", console.error);
https2Server.listen(5002);

// const rootCA = readFileSync("/Users/yusheng/Library/Application Support/mkcert/rootCA.pem")
// const rootCA = readFileSync("C:\\Users\\samue\\AppData\\Local\\mkcert\\rootCA.pem");
// const clientHttp2Session1 = http2.connect("https://localhost:5002", { ca: rootCA });
// clientHttp2Session1.on('remoteSettings', (settings) => {
//   console.log('remoteSettings received', settings);
//   Array(3).fill(0).forEach(() => clientHttp2Session1.request().on('response', console.log).end());
// })
// Array(3).fill(0).forEach(() => clientHttp2Session1.request().end());
// const clientHttp2Session2 = http2.connect("https://localhost:5002", { ca: rootCA });
// clientHttp2Session2.on('')

// clientHttp2Session1.request().on('response', console.log).end();
// const clientHttp2Session2 = http2.connect("https://localhost:5002", {
//   ca: readFileSync(
//     "/Users/yusheng/Library/Application Support/mkcert/rootCA.pem",
//   ),
// });
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
  // console.log(req.headers);
  setTimeout(() => res.end("Welcome to HTTP/1.1 Server"), 1000);
  // res.end("Welcome to HTTP/1.1 Server");
});
