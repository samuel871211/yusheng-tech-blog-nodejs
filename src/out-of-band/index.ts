import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";

httpServer.on("request", function requestListener(req, res) {
  if (req.url === "/favicon.ico") return faviconListener(req, res);
  // 用來測試 out-of-band，把 url, headers, body 都印出來，需搭配 ngrok 一起使用
  const chunks: Buffer[] = [];
  req.on("data", (chunk) => {
    chunks.push(chunk);
  });
  req.on("end", () => {
    const buffer = Buffer.concat(chunks);
    const utf8 = buffer.toString("utf8");
    console.log({
      url: req.url,
      headers: req.headers,
      utf8,
    });
    res.end("ok");
  });
});
