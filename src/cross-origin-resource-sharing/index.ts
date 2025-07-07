import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";
import { http5000Server, http5001Server } from "./httpServers";

// 白頁，等等都透過 http://localhost:5000 的 F12 > Console
// 去發起 fetch 請求
http5000Server.on("request", function requestListener(req, res) {
  res.end();
  return;
});

// cross-origin resources
http5001Server.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);

  if (req.url === "/cors-safelisted-response-header") {
    res.writeHead(200, {
      "access-control-allow-origin": "http://localhost:5000",
      "cache-control": "cache-control",
      "content-language": "content-language",
      "content-length": 0,
      "content-type": "text/html",
      expires: "expires",
      "last-modified": "last-modified",
      pragma: "pragma",
      "x-custom-header1": "x-custom-value1",
    });
    res.end();
    return;
  }

  if (req.url === "/access-control-expose-headers") {
    res.writeHead(200, {
      "access-control-allow-origin": "http://localhost:5000",
      "cache-control": "cache-control",
      "content-language": "content-language",
      "content-length": 0,
      "content-type": "text/html",
      expires: "expires",
      "last-modified": "last-modified",
      pragma: "pragma",
      "access-control-expose-headers": "connection, date, keep-alive",
    });
    res.end();
    return;
  }

  if (req.url === "/access-control-allow-headers") {
    if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "access-control-allow-origin": "http://localhost:5000",
        "access-control-allow-headers": "authorization",
      });
      res.end();
      return;
    }
    res.writeHead(200, {
      "access-control-allow-origin": "http://localhost:5000",
      "access-control-allow-headers": "authorization",
    });
    res.end();
    return;
  }

  return notFoundListener(req, res);
});
