import { type IncomingMessage } from "http";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";
import http80Server from "./http80Server";

const scannedRoutes: Array<
  Pick<IncomingMessage, "url" | "method" | "headers">
> = [];

// clear state because of nodemon HMR
scannedRoutes.length = 0;
http80Server.removeAllListeners("request");

http80Server.on("request", function requestListener(req, res) {
  // favicon
  if (req.method?.toLowerCase() === "get" && req.url === "/favicon.ico") {
    return faviconListener(req, res);
  }

  // 下載報表的路由
  if (
    req.method?.toLowerCase() === "get" &&
    req.url === "/generateScannedRoutes"
  ) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=scannedRoutes.json",
    );
    return res.end(JSON.stringify(scannedRoutes, null, 2));
  }

  // 紀錄 scannedRoutes
  scannedRoutes.push({
    url: req.url,
    method: req.method,
    headers: req.headers,
  });

  // case 1: 嘗試回傳 200 頁面 + 固定內容，觸發 http-enum 腳本終止
  // res.setHeader("Content-Type", "text/html; charset=utf-8");
  // res.end("<h1>Hello World</h1>");
  // return;

  // case2: 嘗試回傳 200 頁面 + 不同內容，讓 n1map 產生大量誤報
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(`<h1>${crypto.randomUUID()}</h1>`);
  return;

  // case2: 其餘 nmap 掃描的路由，都先回傳 404
  return notFoundListener(req, res);
});
