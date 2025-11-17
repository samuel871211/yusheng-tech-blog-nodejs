// txt 文件下載
// import httpServer from "../httpServer";
// httpServer.on('request', function requestListener (req, res) {
//   res.setHeader("Content-Disposition", "attachment; filename=hello world.txt");
//   res.end("hello world");
// });

// 圖片下載
import httpServer from "../httpServer";
import { readFileSync } from "fs";
import { join } from "path";
import { createServer } from "http";
import { faviconListener } from "../listeners/faviconListener";

const image = readFileSync(join(__dirname, "image.jpg"));

httpServer.on("request", function requestListener(req, res) {
  console.log(req.url);
  if (req.url === "/test") {
    // attachment + Larger CL + `<a download>`
    // res.setHeader("Content-Type", "text/html");
    // res.setHeader("Content-Disposition", "attachment; filename=test.html");
    // res.setHeader("Content-Length", 100);
    // res.end("Only11Chars");
    // return;

    // attachment + Smaller CL + `<a download>`
    // res.setHeader("Content-Type", "text/html");
    // res.setHeader("Content-Disposition", "attachment; filename=test.html");
    // res.setHeader("Content-Length", 10);
    // res.end("Only11Chars");
    // return;

    // attachment + 404 + `<a download>`
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Disposition", "attachment; filename=test.html");
    res.end("Only11Chars");
    return;

    // Simple case
    // res.setHeader("Content-Type", "image/jpeg");
    // res.setHeader("Content-Disposition", "attachment; filename=image.jpg");
    // res.end(image);
    // return;
  }

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.end('<a href="/test" download>download</a>');
    return;
  }

  if (req.url === "/favicon.ico") return faviconListener(req, res);
});

const http5001Server = createServer().listen(5001);
http5001Server.on("request", (req, res) => {
  res.setHeader("content-type", "text/html");
  res.end('<a href="http://localhost:5000/test" download>download</a>');
});
