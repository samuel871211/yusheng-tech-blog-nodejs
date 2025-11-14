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
const image = readFileSync(join(__dirname, "image.jpg"));
httpServer.on("request", function requestListener(req, res) {
  res.setHeader("Content-Type", "image/jpeg");
  res.setHeader("Content-Disposition", "attachment");
  // res.setHeader("Content-Disposition", "attachment; filename=image.jpg");
  // res.setHeader("Content-Disposition", "inline");
  res.end(image);
});

createServer()
  .listen(5001)
  .on("request", (req, res) => {
    res.setHeader("content-type", "text/html");
    res.end(
      '<a href="http://localhost:5000/image.jpg" target="_blank">hello</a>',
    );
  });
