import send from "send";
import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";
import { createConnection } from "net";

httpServer.on("request", function requestListener(req, res) {
  // Act as a Origin Server
  if (req.method === "TRACE") {
    console.log(req.headers);
    const startLine = `TRACE ${req.url} HTTP/1.1\r\n`;
    const reqHeadersToRawHTTP = Object.entries(req.headers)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\r\n");
    const body = startLine + reqHeadersToRawHTTP + "\r\n\r\n";
    res.setHeader("Content-Type", "message/http");
    res.end(body);
    return;
  }
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  // test HEAD Request
  if (req.url === "/example.txt") {
    return send(req, String(req.url), { root: __dirname }).pipe(res);
  }
  return notFoundListener(req, res);
});

httpServer.on(
  "connect",
  function connectListener(clientToProxyReq, clientToProxySocket, head) {
    console.log({
      url: clientToProxyReq.url,
      method: clientToProxyReq.method,
      headers: clientToProxyReq.headers,
      head: head.toString("utf8"),
    });
    // todo 驗證格式
    const [host, portStr] = String(clientToProxyReq.url).split(":");
    const port = parseInt(portStr);

    const proxyToTargetSocket = createConnection(
      port,
      host,
      function onConnect() {
        clientToProxySocket.write(
          "HTTP/1.1 200 [Custom Status Text]Connection Established\r\n\r\n",
        );
        proxyToTargetSocket.write(head);
        proxyToTargetSocket.pipe(clientToProxySocket);
        clientToProxySocket.pipe(proxyToTargetSocket);
      },
    );

    // todo 處理錯誤情境, 關閉 TCP 連線
    // proxyToTargetSocket.on('error', function onError (err) {
    //   console.log('proxyToTargetSocket', err);
    //   clientToProxySocket.end();
    //   clientToProxySocket.destroy();
    //   proxyToTargetSocket.end();
    //   proxyToTargetSocket.destroy();
    // });
  },
);
