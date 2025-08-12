import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";

httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  // 轉導後的目標網址，回傳 { method, body }
  if (req.url === "/") {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          method: req.method,
          body: Buffer.concat(chunks).toString(),
        }),
      );
      return;
    });
    return;
  }
  if (req.url === "/201") {
    res.statusCode = 201;
    res.setHeader("location", "http://localhost:5000");
    res.end();
    return;
  }
  if (req.url === "/301") {
    res.statusCode = 301;
    res.setHeader("location", "http://localhost:5000");
    res.end();
    return;
  }
  if (req.url === "/301-to-yusheng-tech-blog") {
    res.statusCode = 301;
    res.setHeader("location", "https://yusheng-tech-blog.web.app");
    res.end();
    return;
  }
  if (req.url === "/302") {
    res.statusCode = 302;
    res.setHeader("location", "http://localhost:5000");
    res.end();
    return;
  }
  if (req.url === "/303") {
    res.statusCode = 303;
    res.setHeader("location", "http://localhost:5000");
    res.end();
    return;
  }
  if (req.url === "/307") {
    res.statusCode = 307;
    res.setHeader("location", "http://localhost:5000");
    res.end();
    return;
  }
  if (req.url === "/308") {
    res.statusCode = 308;
    res.setHeader("location", "http://localhost:5000");
    res.end();
    return;
  }
  if (req.url === "/301-with-no-location") {
    res.statusCode = 301;
    res.end();
    return;
  }
  if (req.url === "/200-with-location") {
    res.statusCode = 200;
    res.setHeader("location", "http://localhost:5000");
    res.end();
    return;
  }
  return notFoundListener(req, res);
});
