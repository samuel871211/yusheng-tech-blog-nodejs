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
    // res.statusCode = 404;
    // res.setHeader("Content-Type", "text/html");
    // res.setHeader("Content-Disposition", "attachment; filename=test.html");
    // res.end("Only11Chars");
    // return;

    // Simple case
    // res.setHeader("Content-Type", "image/jpeg");
    // res.setHeader("Content-Disposition", "attachment; filename=image.jpg");
    // res.end(image);
    // return;

    // filename=中文.jpg
    // TypeError: Invalid character in header content ["Content-Disposition"]
    // res.setHeader("Content-Type", "image/jpeg");
    // res.setHeader("Content-Disposition", "attachment; filename=中文.jpg");
    // res.end(image);
    // return;

    // filename=中文.jpg
    // res.socket?.write(`HTTP/1.1 200 Ok\r\n`);
    // res.socket?.write(`Content-Length: ${Buffer.byteLength(image)}\r\n`);
    // res.socket?.write(`Content-Disposition: attachment; filename=中文.jpg\r\n`);
    // res.socket?.write(`Content-Type: image/jpeg\r\n\r\n`);
    // res.socket?.end(image);

    // filename=hello world.jpg
    // res.setHeader("Content-Type", "image/jpeg");
    // res.setHeader("Content-Disposition", "attachment; filename=hello world.jpg");
    // res.end(image);
    // return;

    // filename=hello%0D%0Aworld.jpg
    // res.setHeader("Content-Type", "image/jpeg");
    // res.setHeader("Content-Disposition", "attachment; filename=hello%0D%0Aworld.jpg");
    // res.end(image);
    // return;

    // filename*=UTF8''%E4%B8%AD%E6%96%87.jpg
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename*=UTF8''%E4%B8%AD%E6%96%87.jpg",
    );
    res.end(image);
    return;
  }

  if (req.url === "/ISO-8859-1") {
    const buffer = Buffer.from("中文", "utf8");
    res.setHeader("Content-Type", "text/html; charset=iso-8859-1");
    res.setHeader("Content-Length", buffer.byteLength);
    res.flushHeaders();
    res.socket?.end(buffer);
    return;
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
